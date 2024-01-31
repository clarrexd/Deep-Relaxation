import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  authenticateUser(formData: any) {
    this.http
      .post('http://localhost:8000/authenticate-user', formData, {
        params: { required_role: 'admin' },
      })
      .pipe(
        catchError((error) => {
          console.error('Error during authentication:', error);
          this.showLoginFailedAlert();
          return throwError(() => error);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          console.log(response);
          this.login();
          sessionStorage.setItem('loggedInUser', JSON.stringify(response));
          this.router.navigate(['dashboard']);
        } else {
          this.showLoginFailedAlert();
        }
      });
  }

  showLoginFailedAlert() {
    alert(
      'Incorrect login details or insufficient permissions. Please try again.'
    );
  }

  submitUserLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authenticateUser(formData);
    }
  }

  login() {
    this.authService.login();
  }

  toggleAuth() {
    return this.authService.toggleAuthentication();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
