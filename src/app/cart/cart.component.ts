import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totals = { subtotal: 0, discount: 0, total: 0 };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotals();

    // Optionally subscribe to cart updates if CartService provides an observable
    // this.cartService.cartItems$.subscribe(items => {
    //   this.cartItems = items;
    //   this.updateTotals();
    // });
  }

  onRemove(product: any) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems(); // Refresh cart items
    this.updateTotals();
  }

  onQuantityChange(product: any, quantity: number) {
    if (quantity > 0 && quantity <= product.stock) {
      this.cartService.updateQuantity(product, quantity);
      this.cartItems = this.cartService.getCartItems(); // Refresh cart items
      this.updateTotals();
    }
  }

  updateTotals() {
    const { subtotal, discount, total } = this.cartService.getCartTotals();
    this.totals = { subtotal, discount, total };
  }

  getSubtotal(): number {
    return this.totals.subtotal;
  }

  getDiscount(): number {
    return this.totals.discount;
  }

  getTotal(): number {
    return this.totals.total;
  }
}
