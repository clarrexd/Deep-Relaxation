import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { LocalstorageService } from '../../core/services/localstorage.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(private cartservice: CartService) {}

  lsItems: any = [];

  ngOnInit(): any {
    this.lsItems = this.cartservice.cartList;
  }
}
