import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../../core/interfaces';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  //Variable to hold all orders
  ordersList: Order[] = [];

  getAllOrders() {
    this.http
      .get<Order[]>('http://localhost:9000/warehouse/orders')
      .subscribe((response) => {
        this.ordersList = response;
      });
  }

  updateOrderStatus(order: Order, newStatus: string): void {
    this.http
      .patch('http://localhost:9000/warehouse/orders', {
        id: order.id,
        status: newStatus,
      })
      .subscribe((response) => {
        alert('Status changes updated successfully');
      });
  }

  updateStatusChanges(): void {
    //Loop to update all statuses to their selected value
    this.ordersList.forEach((order) => {
      const newStatus = (
        document.getElementById(`status-${order.id}`) as HTMLSelectElement
      ).value;
      this.updateOrderStatus(order, newStatus);
    });
  }

  goToOrderDetail(order: Order) {
    this.router.navigate(['dashboard/orders', order.id]);
  }

  ngOnInit(): void {
    this.getAllOrders();
  }
}
