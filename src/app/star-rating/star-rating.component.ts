import { Component, Input } from '@angular/core';
import { Product } from '../types/product';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() rating!: number;
  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }
}
