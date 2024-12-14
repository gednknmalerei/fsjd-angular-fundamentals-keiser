import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() product: Product | undefined;
  @Input() cartItem: CartItem | undefined;
  @Output() cartUpdated: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  constructor() {}

  public updateCart(id: number, quantity: number): void {
    this.cartUpdated.emit({ id, count: quantity });
  }

  getTotalPrice(price: number, quantity: number): number {
    const total = price * quantity;
    return Math.round(total * 100) / 100;
  }
}
