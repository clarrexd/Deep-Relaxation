import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  login(): void {
    this.isLoggedIn = true;
    alert('You have successfully logged in!');
  }

  logout(): void {
    this.isLoggedIn = false;
    alert('You have successfully logged out.');
    sessionStorage.clear();
    //Maybe change to a modal?
  }

  isAuthenticated(): boolean {
    if (!this.isLoggedIn && sessionStorage.getItem('loggedInUser') !== null) {
      this.isLoggedIn = true;
    }
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

  loginGuard(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }
}
