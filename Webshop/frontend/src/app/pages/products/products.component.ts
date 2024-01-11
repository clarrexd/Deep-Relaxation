import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

interface productsInterface {
  name: string;
  description: string;
  price: string;
  imageURL: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  //create interface needed?
  productsList: any = [];

  getProductsFromDB() {
    this.http
      .get('http://localhost:8000/products')
      .subscribe((response: any) => {
        this.productsList = response;
        console.log(this.productsList);
      });
  }

  ngOnInit(): void {
    this.getProductsFromDB();
  }
}
