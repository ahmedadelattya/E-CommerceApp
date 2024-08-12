import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceAfterDis',
  standalone: true,
})
export class PriceAfterDisPipe implements PipeTransform {
  transform(originalPrice: number, discountPercentage: number): number {
    if (!originalPrice || !discountPercentage) {
      return originalPrice;
    }
    return originalPrice - (originalPrice * discountPercentage) / 100;
  }
}
