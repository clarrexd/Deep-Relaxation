import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private localstorage: LocalstorageService) {}

  cartList: any = [];
}
