import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  googleAuthSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  //Login function with alert
  login(): void {
    this.isLoggedIn = true;
    alert('You have successfully logged in!');
  }

  //Logout function, clears sessionstorage where the loggedin key is and unsubscribes too googleAuth if the user was logged in through Google
  logout(): void {
    if (this.isAuthenticated() === true) {
      sessionStorage.clear();

      if (this.googleAuthSubscription) {
        this.googleAuthSubscription.unsubscribe();
      }
      this.socialAuthService.signOut();
      alert('You have successfully logged out.');
    }

    this.isLoggedIn = false;
  }

  //Checks if the user is logged in, returns true or false
  isAuthenticated(): boolean {
    if (!this.isLoggedIn && sessionStorage.getItem('loggedInUser') !== null) {
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }

  //Toggle for login & logout
  toggleAuthentication(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.login();
    }
  }

  //Navigates the user to my-pages if they are logged in. Cannot access login page if logged in
  loginGuard(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['my-pages']);
    }
  }

  //Navigates the user to login page if the user is not logged in. Cannot acces my-pages if not logged in
  mypagesGuard(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
