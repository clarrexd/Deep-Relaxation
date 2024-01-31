import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReloadService } from '../../core/services/reload.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  constructor(private reloadService: ReloadService) {}

  reloaded = false;

  ngOnInit(): void {
    //To make sure localstorage is cleared. Run only once.
    if (!this.reloadService.hasReloadedCheckout()) {
      this.reloadService.setReloadedCheckout();
      location.reload();
    }
  }
}
