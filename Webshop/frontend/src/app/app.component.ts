import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faUser, far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';

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
export class AppComponent {
  title = 'Deep Relaxation';

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    library.addIcons(faUser); // add FA icons
  }
}
