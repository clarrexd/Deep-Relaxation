import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    if (this.isAuthenticated() === true) {
      sessionStorage.clear();
    }

    alert('You have successfully logged out.');

    this.isLoggedIn = false;
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

  loginGuard(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  dashboardGuard(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
