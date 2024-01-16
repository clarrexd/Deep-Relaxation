import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setItemCart(list: any) {
    window.localStorage.setItem('cart', JSON.stringify(list));
  }

  getItemCart() {
    const getItem = window.localStorage.getItem('cart');
    return JSON.stringify(getItem);
  }
}
