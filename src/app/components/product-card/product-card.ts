import { Component } from '@angular/core';
import { StockStatusPipe } from '../../pipes/stock-status-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

import { Product, CartItem, ProductCategory } from '../../models/product.model'
@Component({
  selector: 'app-product-card',
  imports: [CommonModule, StockStatusPipe, DiscountPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
   @Input() product!: Product;

    getStockStatusClass(stock: number): string {
    if (stock > 10) {
      return 'in-stock';
    } else if (stock >= 1 && stock <= 10) {
      return 'limited-stock';
    } else {
      return 'out-stock';
    }
  }
}
