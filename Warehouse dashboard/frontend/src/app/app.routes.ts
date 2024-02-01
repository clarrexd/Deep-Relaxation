import { Routes } from '@angular/router';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';

//Route guards used to protect certain URLs from being accessed if certain conditions are not met. See individual functions for each condition.
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [() => inject(AuthService).loginGuard()],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [() => inject(AuthService).dashboardGuard()],
  },
  {
    path: 'dashboard/orders',
    component: OrdersComponent,
    title: 'Dashboard - Orders',
    canActivate: [() => inject(AuthService).dashboardGuard()],
  },
  {
    path: 'dashboard/orders/:order_id',
    component: OrderDetailsComponent,
    title: 'Dashboard - Orders',
    canActivate: [() => inject(AuthService).dashboardGuard()],
  },
  {
    path: 'dashboard/inventory',
    component: InventoryComponent,
    title: 'Dashboard - Inventory',
    canActivate: [() => inject(AuthService).dashboardGuard()],
  },

  { path: '**', redirectTo: 'login' },
  { path: '', component: LoginComponent },
];
