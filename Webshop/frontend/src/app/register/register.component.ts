import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(
    library: FaIconLibrary,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  faUser = faUser;
  faLock = faLock;
  faEnvelope = faEnvelope;

  registerForm!: FormGroup;
  registerUserUrl = 'http://localhost:8000/register-user';
  private destroy$: Subject<void> = new Subject<void>();
  private submitted = false;

  //Function for post request to backend
  registerUser(formData: any) {
    this.http
      .post(this.registerUserUrl, formData)
      .subscribe((response: any) => {
        if (response) {
          console.log(response);
          alert('Your account has been successfully created!');
          this.registerForm.reset();
        }
      });
  }

  // async function to validate password
  validatePasswordAsync(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const password = control.value;

      if (!password) {
        return of(null);
      }

      // Check if the form has been submitted before triggering the async validation
      if (this.submitted) {
        return this.http.post(this.registerUserUrl, { password }).pipe(
          map((response: any) => {
            return response.isValid ? null : { invalidPassword: true };
          }),
          catchError(() => of({ invalidPassword: true }))
        );
      } else {
        return of(null); // Skip validation if the form hasn't been submitted
      }
    };
  }

  submitRegistration() {
    this.submitted = true;

    // Check form validation. If it's valid, send post request with formdata to backend
    if (this.registerForm?.valid) {
      const formData = this.registerForm.value;
      this.registerUser(formData);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required, this.validatePasswordAsync()],
      email: ['', [Validators.required, Validators.email]],
    });

    // Monitor form submission
    this.registerForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.submitted) {
          this.registerForm.get('password')?.updateValueAndValidity();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
