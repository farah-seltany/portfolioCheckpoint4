import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers()
  {
    return this.http.get<User[]>(`${this.userUrl}`);
  }
  
  updateUser(user)
  {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user);
  }
}
