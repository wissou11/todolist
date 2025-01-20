import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // URL du backend (json-server)

  constructor(private http: HttpClient) {}

  // Authentification de l'utilisateur
  login(login: string, password: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.apiUrl}?login=${login}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('token', user.token);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  // Vérification de la connexion
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
  }
}
