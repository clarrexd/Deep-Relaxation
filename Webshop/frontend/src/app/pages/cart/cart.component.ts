import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(private cartservice: CartService) {}

  lsItems: Array<any> = [];
  totalSum: any = 0;

  ngOnInit(): any {
    this.lsItems = this.cartservice.cartList;
    this.totalSum = this.lsItems.reduce(function (acc, obj) {
      return acc + obj.price * obj.quantity;
    }, 0);
    console.log(this.totalSum);
  }
}
