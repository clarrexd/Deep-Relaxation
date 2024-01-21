import { Component, OnInit } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../core/services/auth.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleSigninService } from '../core/services/google-signin.service';
import {
  SocialAuthService,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    GoogleSigninButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faGoogle = faGoogle;
  constructor(
    library: FaIconLibrary,
    private authService: AuthService,
    private googleSignIn: GoogleSigninService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // handleOauthResponse(response: any) {
  //   const responsePayload = this.decodeJWTToken(response.credential);
  //   console.log(responsePayload);
  //   sessionStorage.setItem('loggedinUser', JSON.stringify(responsePayload));
  //   this.router.navigate(['dashboard']);
  // }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
      if (user.idToken) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        this.login();
        this.router.navigate(['dashboard']);
      }
    });
    // if ()
  }

  toggleAuth() {
    return this.authService.toggleAuthentication();
  }

  login() {
    this.authService.login();
  }

  // async signInWithGoogle(): Promise<void> {
  //   try {
  //     const user = await this.googleSignIn.signIn();
  //     console.log('Successful google login from' + user);
  //     if (user) {
  //       this.login();
  //       this.router.navigate(['dashboard']);
  //     }
  //   } catch (error) {
  //     console.error('Google login FAILED 404 WEWOOWEWOOOOO', error);
  //   }
  // }

  // async googleSignOut(): Promise<void> {
  //   await this.googleSignIn.signOut();
  //   this.router.navigate(['login']);
  // }
}
