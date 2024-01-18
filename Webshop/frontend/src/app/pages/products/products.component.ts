import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCommonModule } from '@angular/material/core';
import { CartService } from '../../core/services/cart.service';
import { LocalstorageService } from '../../core/services/localstorage.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCommonModule, MatSelectModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cartservice: CartService,
    private localstorage: LocalstorageService
  ) {}

  productsList: any = [];

  //Fetching products from database
  getProductsFromDB() {
    this.http
      .get('http://localhost:8000/products')
      .subscribe((response: any) => {
        this.productsList = response;
      });
  }

  addToCart(item: any) {
    let fetchedItems: Array<any> = this.localstorage.fetchItemsFromLS();

    if (fetchedItems === null) {
      fetchedItems = [];
    }

    this.cartservice.cartList = fetchedItems;
    this.cartservice.cartList.push(item);
    this.localstorage.setItemCart(this.cartservice.cartList);

    // this.cartservice.cartList.push(item);
  }

  ngOnInit(): void {
    this.getProductsFromDB();
    this.cartservice.cartList = this.localstorage.getItemCart();
  }
}
