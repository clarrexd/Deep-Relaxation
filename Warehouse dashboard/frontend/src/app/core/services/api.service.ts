import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  id: any;

  constructor(private http: HttpClient) {}

  //Variable to hold all orders in an array or a specific order for order details
  ordersList: any;

  //Variable to hold all products in the inventory in an array
  inventoryList: any;

  getAllOrders() {
    this.http
      .get('http://localhost:9000/warehouse/orders')
      .subscribe((response) => {
        this.ordersList = response;
      });
  }

  getOrderDetail(id: any) {
    this.http
      .get(`http://localhost:9000/warehouse/orders/${id}`)
      .subscribe((response) => {
        this.ordersList = response;
      });
  }

  getInventory() {
    this.http
      .get('http://localhost:9000/warehouse/inventory')
      .subscribe((response) => {
        this.inventoryList = response;
      });
  }
}
