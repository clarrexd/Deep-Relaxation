import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../core/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  orderId!: number;
  orderDetails: any;
  newStatus: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  //GET request to getting order details for a specific order
  getOrderDetails() {
    this.http
      .get<any>(`http://localhost:9000/warehouse/order-details/${this.orderId}`)
      .subscribe((response) => {
        this.orderDetails = response;
        this.newStatus = response.status;
      });
  }

  //PATCH request for updating status of the order
  updateOrderStatus(): void {
    this.http
      .patch('http://localhost:9000/warehouse/orders', {
        id: this.orderId,
        status: this.newStatus,
      })
      .subscribe((response) => {
        alert('Status changes updated successfully');
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['order_id'];
    });
    this.getOrderDetails();
  }
}
