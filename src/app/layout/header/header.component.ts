import { Component, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public cartCount: number = 0;
  faCartShopping = faCartShopping;
  private cartCountSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartCountSubscription = this.cartService
      .getCartCount()
      .subscribe((count) => {
        this.cartCount = count;
      });
  }

  ngOnDestroy() {
    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }
  }
}
