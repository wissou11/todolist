import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-reactive-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo-reactive-form.component.html',
  styleUrl: './todo-reactive-form.component.css'
})
export class TodoReactiveFormComponent {
  authForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubmit(): void {
    const { login, password } = this.authForm.value;

    this.authService.login(login, password).subscribe((success) => {
      if (success) {
        this.router.navigate(['/todos']);
        this.errorMessage = null;
        this.authForm.reset();
      } else {
        this.errorMessage = 'Invalid login or password.';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.authForm.reset();
    this.router.navigate(['/sign-in']);
    this.errorMessage = null;
  }
}
