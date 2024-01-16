import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCommonModule } from '@angular/material/core';
import { CartService } from '../../core/services/cart.service';

interface productsInterface {
  name: string;
  description: string;
  price: string;
  imageURL: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatCommonModule, MatSelectModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(private http: HttpClient, private cartservice: CartService) {}

  //create interface needed?
  productsList: any = [];

  //Fetching products from database
  getProductsFromDB() {
    this.http
      .get('http://localhost:8000/products')
      .subscribe((response: any) => {
        this.productsList = response;
      });
  }

  ngOnInit(): void {
    this.getProductsFromDB();
  }
}
