import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UserAuthService {
  constructor() {}
  
  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i] == allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            isMatch = false;
          }
        }
      } 
    } return isMatch;
  }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public setId(id: string) {
    localStorage.setItem('id', id);
  }

  public getId(): string {
    return localStorage.getItem('id');
  }

  public setUserName(userName: string) {
    localStorage.setItem('userName', userName);
  }

  public getUserName(): string {
    return localStorage.getItem('userName');
  }

  public setEmail(email: string) {
    localStorage.setItem('email', email);
  }

  public getEmail(): string {
    return localStorage.getItem('email');
  }

  public setPhone(phoneNo: string) {
    localStorage.setItem('phoneNo', phoneNo);
  }

  public getPhone(): string {
    return localStorage.getItem('phoneNo');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken() && this.getUserName();
  }
}
