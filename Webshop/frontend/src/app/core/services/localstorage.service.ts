import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  //Sets items put in the cart to localstorage
  setItemCart(items: any) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  //Gets cart items from localstorage
  getItemCart() {
    const getItems = JSON.parse(localStorage.getItem('cart') as string);

    if (getItems === null) {
      return [];
    }
    return getItems;
  }

  //Function to fetch items from localstorage
  fetchItemsFromLS() {
    const getItemsFromLS = JSON.parse(localStorage.getItem('cart') as string);
    return getItemsFromLS;
  }
}
