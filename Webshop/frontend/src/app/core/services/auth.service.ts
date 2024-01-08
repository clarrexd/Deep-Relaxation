import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  login(): void {
    this.isLoggedIn = true;
    alert('You have successfully logged in!');
  }

  logout(): void {
    this.isLoggedIn = false;
    alert('You have successfully logged out.');
    //Maybe change to a modal?
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
