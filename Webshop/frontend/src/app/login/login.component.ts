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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
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
    private authservice: AuthService,
    private googleSignIn: GoogleSigninService,
    private router: Router
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

  decodeJWTToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  ngOnInit(): void {
    (globalThis as any).handleOauthResponse = (response: any) => {
      const responsePayload = this.decodeJWTToken(response.credential);
      console.log(responsePayload);
      sessionStorage.setItem('loggedinUser', JSON.stringify(responsePayload));
      console.log('pls show I beg');
    };
  }

  toggleAuth() {
    return this.authservice.toggleAuthentication();
  }

  login() {
    if (this.authservice.isAuthenticated() === true) {
      return;
    }
    this.authservice.login();
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
