import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit {
  orderId!: number;
  orderDetails: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  getOrderDetails() {
    this.http
      .get(`http://localhost:9000/warehouse/order-details/${this.orderId}`)
      .subscribe((response) => {
        this.orderDetails = response;
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['order_id'];
    });
    this.getOrderDetails();
  }
}
