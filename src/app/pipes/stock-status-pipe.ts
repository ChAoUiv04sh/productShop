import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus',
  standalone: true
})
export class StockStatusPipe implements PipeTransform {
  transform(stock: number): string {
    if (stock > 10) {
      return 'En stock';
    } else if (stock >= 1 && stock <= 10) {
      return 'Stock limité';
    } else if (stock === 0) {
      return 'Rupture de stock';
    }
    return 'Stock épuisé';
  }
}
