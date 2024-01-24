import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    private cartservice: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  lsItems: Array<any> = [];
  totalSum: any = 0;
  placedByUser: string | undefined;
  user: any = [];

  getUsername() {
    this.user = sessionStorage.getItem('loggedInUser');
  }

  purchaseOrder() {
    this.http
      .post('http://localhost:8000/create-order', {
        items: this.lsItems,
        email: this.user.email,
      })
      .subscribe((response) => {
        if (response) {
          console.log(response);
          localStorage.clear();
          this.router.navigate(['/checkout']);
        }
      });
  }

  ngOnInit(): any {
    this.lsItems = this.cartservice.cartList;
    this.totalSum = this.lsItems.reduce(function (acc, obj) {
      return acc + obj.price * obj.quantity;
    }, 0);
  }
}
