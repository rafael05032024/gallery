import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthReponse = {
  token: string;
  user: User;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = 'http://localhost:3200'

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthReponse> {
    const url = `${this.API}/session`;

    return this.http.post<AuthReponse>(url, { email, password })
    .pipe(
      tap(response => {
        const { token, user } = response;

        localStorage.setItem('@mygallery:user', JSON.stringify(user));
        localStorage.setItem('@mygallery:token', token);
      }),
      catchError(error => {
        console.error(error);

        throw new Error(error.error?.message);
      })
    );
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('@mygallery:user') ?? '');
  }

  getToken(): string {
    return localStorage.getItem('@mygallery:token') ?? '';
  }

  isAuthenticated() {
    return this.getToken() && this.getUser();
  }

  logout() {
    localStorage.removeItem('@mygallery:user');
    localStorage.removeItem('@mygallery:token');
  }
}
