import { Component, OnInit } from '@angular/core';
import { faList, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CommonModule } from '@angular/common';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoTemplateDrivenFormComponent } from '../todo-template-driven-form/todo-template-driven-form.component';
import { TodoUpdateComponent } from '../todo-update/todo-update.component';
import { TodoDirective } from '../todo.directive';
import { TodoPipe } from '../todo.pipe';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, TodoDetailComponent, TodoUpdateComponent,TodoDirective,TodoPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{
  faList = faList;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  showModal = false;
  showUpdateModal: boolean = false;
  todos: Todo[] = [];
  selectedTodo: Todo | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodoList();  // Charge la liste des todos dès l'initialisation du composant
  }

  getTodoList(): void {
    this.todoService.getTodoList().subscribe(
      (data: Todo[]) => {
        this.todos = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des todos', error); // Gestion des erreurs
      }
    );
  }

  // Méthode pour afficher les détails d'un todo
  displayTodoDetail(todo: Todo): void {
    this.selectedTodo = todo;
    this.showModal = true;
  }

  // Méthode pour supprimer un todo
  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo).subscribe(
      () => {
        this.todos = this.todos.filter(t => t._id !== todo._id);  // Met à jour la liste après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression du todo', error); // Gestion des erreurs
      }
    );
  }

  updateTodoStatus(todo: Todo): void {
    // Inverse l'état de 'done' du todo
    todo.done = !todo.done;

    // Appelle la méthode updateTodo du service pour mettre à jour le todo
    this.todoService.updateTodo(todo).subscribe((updatedTodo: Todo) => {
      // Met à jour la liste des todos pour refléter l'état mis à jour
      this.todos = this.todos.map(t => (t._id === updatedTodo._id ? updatedTodo : t));
    });
  }

  closeModal(): void {
    this.showModal = false;  // Cache le modal
  }

  handleTodoUpdated(updatedTodo: Todo): void {
    const index = this.todos.findIndex(t => t._id === updatedTodo._id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;  // Mise à jour de la liste des todos
    }
  }

  // Fermer la modal de mise à jour
  closeUpdateModal(): void {
    this.showUpdateModal = false;
    this.selectedTodo = null;  // Réinitialiser le todo sélectionné
  }

  openUpdateTodoModal(todo: Todo): void {
    this.selectedTodo = todo;  // Set the selected todo for updating
    this.showUpdateModal = true;  // Display the update modal
  }
}
