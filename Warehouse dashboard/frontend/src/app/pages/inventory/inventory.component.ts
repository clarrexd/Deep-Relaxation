import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements OnInit {
  inventoryList: any;

  constructor(private http: HttpClient) {}

  getInventory() {
    this.http
      .get('http://localhost:9000/warehouse/inventory')
      .subscribe((response) => {
        this.inventoryList = response;
      });
  }

  ngOnInit(): void {
    this.inventoryList = this.getInventory();
  }
}
