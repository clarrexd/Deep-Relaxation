import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements OnInit {
  inventoryList: any;

  constructor(private http: HttpClient) {}

  fetchInventory() {
    this.http
      .get('http://localhost:9000/warehouse/inventory')
      .subscribe((response: any) => {
        this.inventoryList = response.map((product: any) => ({
          ...product,
          editMode: false,
          updatedStockBalance: product.stock_balance,
        }));
      });
  }

  startEditMode(product: any): void {
    // Set editMode to true for the clicked product
    product.editMode = true;
  }

  saveChanges(product: any): void {
    //PATCH request to update the stock balance for the clicked product
    this.http
      .patch('http://localhost:9000/warehouse/inventory', {
        id: product.id,
        stock_balance: product.updatedStockBalance,
      })
      .subscribe(() => {
        console.log('Stock balance updated successfully.');
        // Update local data after successful save
        product.stock_balance = product.updatedStockBalance;
        product.editMode = false; // Exit edit mode
      });
  }

  cancelEditMode(product: any): void {
    // Cancel the ongoing edit mode for the clicked product
    product.editMode = false;
  }

  ngOnInit(): void {
    this.fetchInventory();
  }
}
