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

import {
  SocialAuthService,
  GoogleSigninButtonModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

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
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faGoogle = faGoogle;
  loginForm!: FormGroup;

  constructor(
    library: FaIconLibrary,
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //Google login. Sets sessionstorage key, sets logged in state to true and navigates the user to my-pages upon successful login via Google
    this.authService.googleAuthSubscription =
      this.socialAuthService.authState.subscribe((user) => {
        console.log(user);

        if (user.idToken) {
          sessionStorage.setItem('loggedInUser', JSON.stringify(user));

          this.login();
          this.router.navigate(['my-pages']);
        }
      });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //Submits form data
  submitUserLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authenticateUser(formData);
    }
  }

  //Submits form data to the backend to authenticate user for login
  authenticateUser(formData: any) {
    this.http
      .post('http://localhost:8000/authenticate-user', formData)
      .subscribe((response: any) => {
        if (response) {
          console.log(response);
          this.login();
          sessionStorage.setItem('loggedInUser', JSON.stringify(response));
          this.router.navigate(['my-pages']);
          return true;
        } else {
          alert('Incorrect login details. Please try again.');
          return false;
        }
      });
  }

  toggleAuth() {
    return this.authService.toggleAuthentication();
  }

  login() {
    this.authService.login();
  }
}
