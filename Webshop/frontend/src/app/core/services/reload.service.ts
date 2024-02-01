import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  constructor() {}

  private readonly checkoutreloadKey = 'checkoutPageReloaded';
  private readonly cartreloadKey = 'checkoutPageReloaded';

  //Functions to set and retrieve key values from session storage whether the page has been reloaded, to not create an infinite loop of page reloads
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
