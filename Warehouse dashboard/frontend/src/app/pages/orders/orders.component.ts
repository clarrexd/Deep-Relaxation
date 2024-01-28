import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  constructor(private http: HttpClient) {}

  //Variable to hold all orders
  ordersList: any;

  getAllOrders() {
    this.http
      .get('http://localhost:9000/warehouse/orders')
      .subscribe((response) => {
        this.ordersList = response;
      });
  }

  ngOnInit(): void {
    this.ordersList = this.getAllOrders();
    console.log(this.ordersList);
  }
}
