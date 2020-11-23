import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.userUrl}/login`, {
      email,
      password
    }).pipe(
      tap(results => {
        if (results) {
          this.storeCredentials(results);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  private storeCredentials(credentials) {
    if (credentials.token) {
      localStorage.setItem('token', credentials.token);
    }

    if (credentials.email) {
      localStorage.setItem('email', credentials.email);
    }

  }
}
