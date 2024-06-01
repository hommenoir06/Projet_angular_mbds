import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];
  loggedIn: boolean = false;
  currentUser: string | null = null;

  constructor() { }

  logIn(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = username;
      return true;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = null;
  }

  isAdmin(): Promise<boolean> {
    return Promise.resolve(this.loggedIn);
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
