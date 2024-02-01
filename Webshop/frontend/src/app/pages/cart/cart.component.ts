import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../core/services/localstorage.service';
import { ReloadService } from '../../core/services/reload.service';

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
    private router: Router,
    private reloadService: ReloadService
  ) {}

  lsItems: Array<any> = [];
  totalSum: number = 0;
  user: any;

  //Purchase function. Fetches user info from session storage and posts data to backend to create the order then clears localstorage and navigates user to the checkout page
  purchaseOrder() {
    if (this.lsItems.length < 1) {
      alert('Your cart is empty!');
    } else {
      this.user = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
      this.http
        .post('http://localhost:8000/create-order', {
          items: this.lsItems,
          email: this.user.email,
          totalSum: this.totalSum,
        })
        .subscribe((response) => {
          console.log(response);
        });
      localStorage.clear();

      this.router.navigate(['/checkout']);
    }
  }

  ngOnInit(): any {
    this.lsItems = this.cartservice.cartList;

    //Calculate total cost
    this.totalSum = this.lsItems.reduce(function (acc, obj) {
      return acc + obj.price * obj.quantity;
    }, 0);

    //Makes sure localstorage is clear so that the user can make another purchase in the same session
    if (localStorage.getItem('cart') === null) {
      localStorage.setItem('cart', '[]');
      location.reload();
    }
  }
}
