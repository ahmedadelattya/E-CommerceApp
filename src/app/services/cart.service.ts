import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  cartItemCount$ = this.cartItemCount.asObservable();

  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  getCartTotals() {
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity * (item.product.discountPercentage / 100),
      0
    );
    const total = subtotal - discount;
    return { subtotal, discount, total };
  }

  addToCart(product: any, quantity: number) {
    const itemIndex = this.cartItems.findIndex(item => item.product.id === product.id);
    if (itemIndex > -1) {
      // Update quantity if the product is already in the cart
      this.cartItems[itemIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      this.cartItems.push({ product, quantity });
    }
    this.cartItemCount.next(this.cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }

  removeFromCart(product: any) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== product.id);
    this.cartItemCount.next(this.cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }

  updateQuantity(product: any, quantity: number) {
    const itemIndex = this.cartItems.findIndex(item => item.product.id === product.id);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeFromCart(product);
      } else {
        this.cartItems[itemIndex].quantity = Math.min(quantity, this.cartItems[itemIndex].product.stock);
        this.cartItemCount.next(this.cartItems.reduce((acc, item) => acc + item.quantity, 0));
      }
    }
  }
}
