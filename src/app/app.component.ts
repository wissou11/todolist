import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBarComponent } from "./head-bar/head-bar.component";
import { TodoReactiveFormComponent } from "./todo-reactive-form/todo-reactive-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadBarComponent, TodoReactiveFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todolist';
}
