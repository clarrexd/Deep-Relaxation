import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Boolean value to tottle logged in state
  private isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  //Login function
  login(): void {
    this.isLoggedIn = true;
    alert('You have successfully logged in!');
  }

  //Logout function, clears sessionstorage as a key is saved there to keep track of logged in state across app
  logout(): void {
    if (this.isAuthenticated() === true) {
      sessionStorage.clear();
    }

    alert('You have successfully logged out.');

    this.isLoggedIn = false;
  }

  //Check logged in state
  isAuthenticated(): boolean {
    if (!this.isLoggedIn && sessionStorage.getItem('loggedInUser') !== null) {
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }

  //Toggle login and logout
  toggleAuthentication(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.login();
    }
  }

  //Login guard to navigate user to the dashboard if they are logged in. Cannot access the login page when logged in
  loginGuard(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['dashboard']);
    }
  }

  //Dashboard guard to navigate user to the login page if they are not logged in. Cannot access the dashboard page when not logged in
  dashboardGuard(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
