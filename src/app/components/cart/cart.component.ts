import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  public cartItems: CartItem[] = [];
  public cartProducts: Product[] = [];

  constructor(
    private cartService: CartService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();

    this.getCartProducts();
  }

  public updateCart(event: CartItem): void {
    const { id, count } = event;
    if (count === 0) {
      alert(`Product is removed from cart`);
    }
    this.cartItems = this.cartService.updateCart(id, count);
    this.getCartProducts();
  }

  private getCartProducts(): void {
    this.cartProducts = [];
    for (let cartItem of this.cartItems) {
      if (!this.cartProducts.some((product) => product.id === cartItem.id)) {
        this.dataService.getDataById(cartItem.id).subscribe({
          next: (data) => {
            if (data) {
              this.cartProducts.push(data);
            }
          },
          error: (err) => console.error('Error on loading products:', err),
        });
      }
    }
  }

  sumTotal(): number {
    let price: number = 0;

    for (const [index, cartProduct] of this.cartProducts.entries()) {
      const cartItem = this.cartItems[index];
      price += cartProduct.price * cartItem.count;
    }

    return Math.round(price * 100) / 100;
  }
}
