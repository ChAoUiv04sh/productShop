import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, originalPrice?: number): number | null {
    if (!originalPrice || originalPrice <= price) {
      return null;
    }
    const discount = ((originalPrice - price) / originalPrice) * 100;
    return Math.round(discount);
  }
}