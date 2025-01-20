import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { CommonModule } from '@angular/common';
import  {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-todo-template-driven-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todo-template-driven-form.component.html',
  styleUrl: './todo-template-driven-form.component.css'
})
export class TodoTemplateDrivenFormComponent {
  @Input() showModal: boolean = false; // Recevoir la propriété showModal
  @Output() todoAdded = new EventEmitter<Todo>(); // Émettre l'événement pour fermer le modal

  todo: Todo = {
    //_id: '',
    name: '',
    description: '',
    done: false,
    creation_date: new Date(),
    end_date: new Date()
  };

  constructor(private todoService: TodoService) {}

  // Méthode pour ajouter un todo
  addTodo(): void {
    //delete this.todo._id; // Supprimer _id avant d'envoyer

    this.todoService.addTodo(this.todo).subscribe(
      (newTodo: Todo) => {
        this.todoAdded.emit(newTodo); // Émet l'événement pour fermer le modal
      },
      error => {
        console.error('Erreur lors de l\'ajout du todo:', error); // Gérer les erreurs
      }
    );
  }
}
