import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3000/users';
  connectedUser: User;

  constructor(private http: HttpClient, private authService: AuthService) { 
    if (this.authService.getToken()) {
      this.loadUser().subscribe(result => {
        this.connectedUser = result;  
      });
    }
  }

  getUsers()
  {
    return this.http.get<User[]>(`${this.userUrl}`);
  }
  
  updateUser(user)
  {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user);
  }

  loadUser(): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/me`)
      .pipe(
        tap(result => {
          this.connectedUser = result;
        })
      );
  }
}
