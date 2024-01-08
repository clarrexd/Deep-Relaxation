import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  toggleAuthentication(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.login();
    }
  }

  checkAuthentication(): boolean {
    const isAuthenticated = this.isAuthenticated();

    if (isAuthenticated) {
      console.log('Login successful');
    } else {
      console.log('Login attempt failed');
    }
    return isAuthenticated;
  }
}
