import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserService } from '../interface/user.interface';

@Injectable()
export class UserService implements IUserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // API JSONPlaceholder

  constructor(private http: HttpClient) {}

  getUsers(): Observable<unknown> {
    return this.http.get(this.apiUrl);
  }

  createUser(data: IUser): Observable<unknown> {
    return this.http.post(this.apiUrl, data);
  }

  updateUser(id: number, data: IUser): Observable<unknown> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
