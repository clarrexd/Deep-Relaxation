import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setItemCart(items: any) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  getItemCart() {
    const getItems = JSON.parse(localStorage.getItem('cart') as string);

    if (getItems === null) {
      return [];
    }
    return getItems;
  }

  fetchItemsFromLS() {
    const getItemsFromLS = JSON.parse(localStorage.getItem('cart') as string);
    return getItemsFromLS;
  }
}
