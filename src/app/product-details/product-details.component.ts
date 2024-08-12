// product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsRequestsService } from '../services/products-requests.service';
import { CartService } from '../services/cart.service'; // Import CartService
import { Product } from './../types/product';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriceAfterDisPipe } from '../pipes/price-after-dis.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, FormsModule, PriceAfterDisPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  selectedImage: string | null = null;
  quantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsRequestsService,
    private cartService: CartService, // Inject CartService
    private router: Router
  ) {}

  ngOnInit() {
    const productId = this.activatedRoute.snapshot.params['id'];
    if (productId) {
      this.productsService.getProductDetails(productId).subscribe(
        (product) => {
          this.product = product;
          this.selectedImage = this.product.images[0];
        },
        (error) => {
          this.router.navigate(['/not-found']);
        }
      );
    } else {
      this.router.navigate(['/not-found']);
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
  }

  getWholePart(price: number): string {
    return Math.floor(price).toString();
  }

  getCentsPart(price: number): string {
    return ((price * 100) % 100).toFixed(0).padStart(2, '0');
  }
}
