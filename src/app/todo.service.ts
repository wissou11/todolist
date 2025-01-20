import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos';
  constructor(private http: HttpClient) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);  // Retourne un observable de type Todo[]
  }

  // Méthode pour obtenir un todo par son ID
  getTodoById(todo: Todo): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${todo._id}`);  // Recherche un todo par son ID
  }

  updateTodo(todo: Todo): Observable<Todo> {
    console.log(todo._id);
    return this.http.put<Todo>(`${this.apiUrl}/${todo._id}`, todo);
  }

  // Méthode pour supprimer un todo
  deleteTodo(todo: Todo): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${todo._id}`);  // Suppression du todo par son ID
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo); // Utilisez POST pour ajouter un todo
  }
}
