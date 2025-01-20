import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent {
  @Input() todo: Todo | null = null; // Todo reçu du composant parent
  @Output() todoUpdated: EventEmitter<Todo> = new EventEmitter(); // Pour envoyer l'info de mise à jour au parent
  faCheck=faCheck;
  constructor(private todoService: TodoService) {}

  updateTodoStatus(): void {
    if (this.todo) {
      console.log(this.todo._id);
      // Toggle the 'done' property
      this.todo.done = !this.todo.done;

      // Call the service to update the todo in the database
      this.todoService.updateTodo(this.todo).subscribe(updatedTodo => {
        console.log('Todo status updated:', updatedTodo);
      });
    }
  }

  // Méthode pour mettre à jour l'état du todo (done / not done)
  toggleDone() {
    if (this.todo) {
      this.todo.done = !this.todo.done;
      this.updateTodo(this.todo); // Mise à jour du todo via le service
    }
  }

  // Méthode pour appeler le service pour mettre à jour le todo dans db.json
  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(updatedTodo => {
      this.todoUpdated.emit(updatedTodo); // Émettre l'événement de mise à jour
    });
  }
}
