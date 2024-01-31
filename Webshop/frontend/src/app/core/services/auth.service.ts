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

  login(): void {
    this.isLoggedIn = true;
    alert('You have successfully logged in!');
  }

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
      this.router.navigate(['my-pages']);
    }
  }

  mypagesGuard(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
