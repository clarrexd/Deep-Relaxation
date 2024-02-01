import { Routes, NavigationExtras } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { CheckoutComponent } from './pages/checkout/checkout.component';

//Routes with route guards that prohibits user from accessing certain URLs if conditions are not met. See individual functions for exact conditions.
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:product_id', component: ProductDetailsComponent },
  { path: 'contact', component: ContactUsComponent },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [() => inject(AuthService).loginGuard()],
  },
  { path: 'register', component: RegisterComponent, title: 'Sign up' },
  {
    path: 'my-pages',
    component: UserDashboardComponent,
    title: 'My pages',
    canActivate: [() => inject(AuthService).mypagesGuard()],
  },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: 'home' },
  { path: '', component: HomeComponent },
];
