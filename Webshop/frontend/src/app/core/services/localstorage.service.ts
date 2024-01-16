import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setItemCart(list: any) {
    localStorage.setItem('cart', JSON.stringify(list));
  }

  getItemCart() {
    const getItems = JSON.parse(localStorage.getItem('cart') as string);
    if (getItems === null) {
      return [];
    }
    return getItems;
  }
}
