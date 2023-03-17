import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080/api/auth';
  PATH_OF_API_USER = 'http://localhost:8080/users';
  PATH_OF_API_ADMIN = 'http://localhost:8080/admin';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private httpclient: HttpClient,
  ) {}


  login(loginData): Observable<any> {
    return this.httpclient.post(
      this.PATH_OF_API + '/signin',
      loginData,
      this.httpOptions
    );
  }

  createUser(user: User) {
    return this.httpclient.post<Response>(this.PATH_OF_API + '/signup', user).pipe(
      tap((response: Response) => {
        console.log(response);
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  getUsers() {
    return this.httpclient.get(this.PATH_OF_API_ADMIN + '/users');
  }

  updateUser(user: User, id: string) {
    console.log(user, id);
    return this.httpclient.put(`${this.PATH_OF_API_USER}/${id}`, user);
  }

  updateUserByAdmin(user: User, id: string) {
    return this.httpclient.put(`${this.PATH_OF_API_ADMIN}/users/${id}`, user);
  }

  deleteUser(id: string) {
    return this.httpclient.delete(`${this.PATH_OF_API_ADMIN}/users/${id}`);
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

}
