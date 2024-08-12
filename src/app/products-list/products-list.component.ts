// products-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductsRequestsService } from '../services/products-requests.service';
import { CartService } from '../services/cart.service'; // Import CartService

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsRequestsService,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit() {
    this.productService
      .getProductsList()
      .subscribe((data: any) => (this.products = data.products));
  }

  addToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }
}
