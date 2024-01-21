import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCommonModule } from '@angular/material/core';
import { CartService } from '../../core/services/cart.service';
import { LocalstorageService } from '../../core/services/localstorage.service';
import { Router } from '@angular/router';
import { BackendApiService } from '../../core/services/backend-api.service';
import { Product } from '../../core/interfaces';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatCommonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  quantityControl = new FormControl();

  constructor(
    private http: HttpClient,
    private cartservice: CartService,
    private localstorage: LocalstorageService,
    private router: Router
  ) {}

  productsList: Product[] = [];

  //Fetching products from database
  getProductsFromDB() {
    this.http
      .get('http://localhost:8000/products', { withCredentials: true })
      .subscribe((response: any) => {
        this.productsList = response;
        this.productsList.forEach((product) => {
          product.quantity = 1;
        });
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
  }

  goToProductDetail(product: Product) {
    // Navigate to the product detail route with the current product id
    this.router.navigate(['/products', product.id]);
  }

  ngOnInit(): void {
    this.getProductsFromDB();
    this.cartservice.cartList = this.localstorage.getItemCart();
  }
}
