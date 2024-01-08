import { Component } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../core/services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
export class LoginComponent {
  faUser = faUser;
  faLock = faLock;
  faGoogle = faGoogle;
  constructor(library: FaIconLibrary, private authservice: AuthService) {}

  toggleAuth() {
    return this.authservice.toggleAuthentication();
  }
}
