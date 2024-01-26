import { Routes } from '@angular/router';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { InventoryComponent } from './pages/inventory/inventory.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/orders', component: OrdersComponent },
  {
    path: 'dashboard/order-details/:order_id',
    component: OrderDetailsComponent,
  },
  { path: 'dashboard/inventory', component: InventoryComponent },
  { path: '**', redirectTo: 'login' },
  { path: '', component: LoginComponent },
];
