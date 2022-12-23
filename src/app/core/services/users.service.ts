import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`)
  }
}
