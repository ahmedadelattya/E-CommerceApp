import { Router, RouterLink } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Product } from '../types/product';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { PriceAfterDisPipe } from '../pipes/price-after-dis.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgStyle, RouterLink, StarRatingComponent, PriceAfterDisPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() productItem!: Product;
  @Output() sendProductId = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter<{ product: Product; quantity: number }>();

  constructor(private router: Router) {}

  handleRedirect(id: number) {
    this.router.navigate(['product-details', id]);
  }

  getWholePart(price: number): string {
    return Math.floor(price).toString();
  }

  getCentsPart(price: number): string {
    return ((price * 100) % 100).toFixed(0).padStart(2, '0');
  }

  handleAddToCart() {
    // Emit the product with a default quantity of 1
    this.addToCart.emit({ product: this.productItem, quantity: 1 });
  }
}
