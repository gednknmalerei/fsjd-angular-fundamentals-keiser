import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly STORAGE_KEY_CART = 'cart';
  private readonly STORAGE_KEY_ORDER = 'order';
  private cartCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  cart: CartItem[] = [];
  order: CartItem[] = [];

  constructor() {
    const savedCart = localStorage.getItem(this.STORAGE_KEY_CART);
    this.cart = savedCart ? JSON.parse(savedCart) : [];
    const savedOrder = localStorage.getItem(this.STORAGE_KEY_ORDER);
    this.order = savedOrder ? JSON.parse(savedOrder) : [];
    this.updateCartCount();
  }

  private updateCartCount() {
    const totalItems = this.cart.length;
    this.cartCountSubject.next(totalItems);
  }

  addToCart(id: number, count: number): CartItem[] {
    // does article already exists?
    const existingItem = this.cart.find((item) => item.id === id);

    if (existingItem) {
      // increment count
      existingItem.count += count;
    } else {
      // add new article
      const newCartItem: CartItem = { id: id, count: count };
      this.cart.push(newCartItem);
    }

    this.saveCartToLocalStorage();
    this.updateCartCount();
    return this.cart;
  }

  updateCart(id: number, count: number): CartItem[] {
    const existingItem = this.cart.find((item) => item.id === id);

    if (existingItem) {
      if (count === 0) {
        // remove item
        this.cart = this.cart.filter((item) => item.id !== id);
      } else {
        existingItem.count = count;
      }
    } else {
      console.error('Error on updating cart');
    }

    this.saveCartToLocalStorage();
    this.updateCartCount();
    return this.cart;
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getCartCount() {
    return this.cartCountSubject.asObservable();
  }

  getOrder(): CartItem[] {
    return this.order;
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY_CART, JSON.stringify(this.cart));
  }

  private saveOrderToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY_ORDER, JSON.stringify(this.cart));
  }

  clearCartToOrder(): void {
    this.order = this.cart;
    this.saveOrderToLocalStorage();
    this.cart = [];
    this.saveCartToLocalStorage();
    this.updateCartCount();
  }
}
