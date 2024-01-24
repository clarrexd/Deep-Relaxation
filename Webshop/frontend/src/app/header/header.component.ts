import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../core/services/cart.service';
import { LocalstorageService } from '../core/services/localstorage.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faUser = faUser;
  constructor(
    private authservice: AuthService,
    private cartservice: CartService,
    private localstorage: LocalstorageService,
    private socialAuthService: SocialAuthService
  ) {}

  isAuthenticated() {
    return this.authservice.isAuthenticated();
  }

  logoutFromHeader() {
    this.authservice.logout();
  }
}
