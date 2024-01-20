import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  constructor(private http: HttpClient) {}

  //replace with correct call to actual id of said product
  id: any;

  // //Fetching products from database
  // getProductsFromDB() {
  //   this.http
  //     .get('http://localhost:8000/products')
  //     .subscribe((response: any) => {
  //       return response;
  //     });
  // }

  // Fetch productdetails for specific product matching with id
  // fetchProductDetails() {
  //   this.http
  //     .get(`http://localhost:8000/products/${this.id}`)
  //     .subscribe((response: any) => {
  //       return response;
  //     });
  // }
}
