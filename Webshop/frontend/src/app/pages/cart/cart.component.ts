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
  constructor(private localstorage: LocalstorageService) {}

  lsItems: any = [];

  ngOnInit(): any {
    this.lsItems = this.localstorage.getItemCart();
  }

  //LOCALSTORAGE RESETS WHEN PAGE REFRESHES ON A DIFFERENT PATH (not product or cart)

  //Change needed: setItem to LS on add to cart buttonclick instead of cart component oninit
}
