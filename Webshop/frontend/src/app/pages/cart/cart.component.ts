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
  constructor(
    private cartservice: CartService,
    private localstorage: LocalstorageService
  ) {}

  lsItems: any = [];

  // initGetItemsFromLS() {
  //   const getLSitems = this.localstorage.getItemCart();
  //   this.localstorage.getItemCart();
  //   return getLSitems;
  // }

  ngOnInit(): any {
    const getLSitems = this.localstorage.getItemCart();
    this.lsItems = getLSitems;
    console.log(this.lsItems);
  }

  //Den skriver just nu över localstorage key:n med nytt värde, itne adderar.
}
