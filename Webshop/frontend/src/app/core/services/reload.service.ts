import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  constructor() {}

  private readonly checkoutreloadKey = 'checkoutPageReloaded';
  private readonly cartreloadKey = 'checkoutPageReloaded';

  setReloadedCheckout() {
    sessionStorage.setItem(this.checkoutreloadKey, 'true');
  }

  hasReloadedCheckout(): boolean {
    return sessionStorage.getItem(this.checkoutreloadKey) === 'true';
  }

  setReloadedCart() {
    sessionStorage.setItem(this.cartreloadKey, 'true');
  }

  hasReloadedCart(): boolean {
    return sessionStorage.getItem(this.cartreloadKey) === 'true';
  }
}
