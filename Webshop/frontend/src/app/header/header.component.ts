import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authservice: AuthService) {}

  login(): void {
    this.authservice.login();
  }

  logout(): void {
    this.authservice.logout();
  }

  checkAuthentication() {
    return this.authservice.checkAuthentication();
  }

  logoutFromHeader() {
    if (this.checkAuthentication() === true) {
      this.logout();
    }
  }
}
