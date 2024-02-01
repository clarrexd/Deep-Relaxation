import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  productDetails: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  //GET request to get product details
  getProductDetails() {
    return this.http
      .get(`http://localhost:8000/products/${this.productId}`)
      .subscribe((response) => {
        this.productDetails = response;
      });
  }

  ngOnInit(): void {
    //Gives the variable productId the value of the parameters, which is the id of the product
    this.route.params.subscribe((params) => {
      this.productId = params['product_id'];
    });
    this.getProductDetails();
  }
}
