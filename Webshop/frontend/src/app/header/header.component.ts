import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../core/services/cart.service';
import { LocalstorageService } from '../core/services/localstorage.service';

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
    private localstorage: LocalstorageService
  ) {}

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

  convertCartToLS() {
    this.localstorage.setItemCart(this.cartservice.cartList);
  }
}
