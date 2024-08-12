import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {
    // Subscribe to the cart item count observable to keep the count updated
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
  }
}
