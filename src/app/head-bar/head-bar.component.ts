import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../todo';
import { TodoTemplateDrivenFormComponent } from '../todo-template-driven-form/todo-template-driven-form.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  imports: [CommonModule,TodoTemplateDrivenFormComponent],
  templateUrl: './head-bar.component.html',
  styleUrl: './head-bar.component.css'
})
export class HeadBarComponent {

  constructor(private router: Router,public authService: AuthService) {}
  redirectTo(path: string): void {
    this.router.navigate([path]);
  }
  logout(): void {
    this.authService.logout();
  }
  showModal: boolean = false; // Gérer l'affichage du modal

  // Méthode pour ouvrir le modal
  openModal(): void {
    this.showModal = true;
  }

  // Méthode pour fermer le modal
  closeModal(): void {
    this.showModal = false;
  }

}
