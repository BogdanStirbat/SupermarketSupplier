import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: User = null;
  public accessToken: string = null;

  constructor() {
    let accessToken = localStorage.getItem('accessToken');
    let userId = localStorage.getItem('userId');
    let userName = localStorage.getItem('userName');
    let userRole = localStorage.getItem('userRole');

    if (accessToken !== null && userId !== null && userName !== null && userRole !== null) {
      this.accessToken = accessToken;
      this.user = new User(Number(userId), userName, userRole);
    }
  }

  public isAuthenticated(): boolean {
    return this.user !== null;
  }

  public isRegularUser(): boolean {
    return this.isAuthenticated() && this.user.role === 'REGULAR_USER';
  }

  public isManagerUser(): boolean {
    return this.isAuthenticated() && this.user.role === 'MANAGER_USER';
  }

  public login(user: User, accessToken: string): void {
    this.user = user;
    this.accessToken = accessToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', this.user.id.toString());
    localStorage.setItem('userName', this.user.username);
    localStorage.setItem('userRole', this.user.role);
  }

  public logout(): void {
    this.user = null;
    this.accessToken = null;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }
}
