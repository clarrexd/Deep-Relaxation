import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../../core/interfaces';
import { EMPTY, catchError, forkJoin, throwError } from 'rxjs';

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

  //GET request to get all orders
  getAllOrders() {
    this.http
      .get<Order[]>('http://localhost:9000/warehouse/orders')
      .subscribe((response) => {
        this.ordersList = response;
      });
  }

  //Update status changes based on input value
  updateStatusChanges(): void {
    const observables = this.ordersList.map((order) => {
      const newStatus = (
        document.getElementById(`status-${order.id}`) as HTMLSelectElement
      ).value;

      return this.http
        .patch('http://localhost:9000/warehouse/orders', {
          id: order.id,
          status: newStatus,
        })
        .pipe(
          catchError((error) => {
            alert(`Error updating order ${order.id}:, ${error}`);

            return EMPTY;
          })
        );
    });

    //Alert message when the PATCH requests are finished
    forkJoin(observables).subscribe((responses) => {
      alert('Status changes updated successfully');
    });
  }

  //Go to order details for a specific order
  goToOrderDetail(order: Order) {
    this.router.navigate(['dashboard/orders', order.id]);
  }

  ngOnInit(): void {
    this.getAllOrders();
  }
}
