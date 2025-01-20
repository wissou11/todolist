import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-update.component.html',
  styleUrl: './todo-update.component.css'
})
export class TodoUpdateComponent {
  @Input() todo!: Todo ;  // Todo à modifier
  @Output() todoUpdated = new EventEmitter<Todo>();  // Événement pour notifier le parent que le todo a été mis à jour
  @Output() closeModal = new EventEmitter<void>();  // Événement pour fermer la modal

  constructor(private todoService: TodoService) {}

  // Méthode pour soumettre le formulaire et mettre à jour le todo
  updateTodo(): void {
    if (this.todo) {
      this.todoService.updateTodo(this.todo).subscribe(
        (updatedTodo: Todo) => {
          this.todoUpdated.emit(updatedTodo);  // Notifie le parent
          this.closeModal.emit();  // Ferme la modal
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du todo:', error);
        }
      );
    }
  }
  cancelUpdate(): void {
    this.closeModal.emit();  // Emit event to close modal
  }
}
