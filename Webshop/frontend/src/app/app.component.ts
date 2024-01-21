import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faUser, far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { CartService } from './core/services/cart.service';
import { LocalstorageService } from './core/services/localstorage.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HttpClientModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    FooterComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'Deep Relaxation';

  constructor(
    library: FaIconLibrary,
    private cartservice: CartService,
    private localstorage: LocalstorageService,
    private authService: AuthService
  ) {
    library.addIconPacks(fas, far);
    library.addIcons(faUser); // add FA icons
  }

  ngOnInit(): void {
    this.cartservice.cartList = this.localstorage.getItemCart();
    this.authService.isAuthenticated();
  }
}
