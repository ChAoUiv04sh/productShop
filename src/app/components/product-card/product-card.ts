import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { StockStatusPipe } from '../../pipes/stock-status-pipe';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, StockStatusPipe, DiscountPipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard{
  @Input() product!: Product;
  @Output() productClick = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();

  onCardClick(event: MouseEvent): void {
    // Don't emit if click originated from button
    const target = event.target as HTMLElement;
    if (!target.closest('.add-to-cart-btn')) {
      this.productClick.emit(this.product);
    }
  }

  onAddToCart(event: MouseEvent): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('bi-star-fill');
    }
    if (hasHalfStar) {
      stars.push('bi-star-half');
    }
    while (stars.length < 5) {
      stars.push('bi-star');
    }
    return stars;
  }
   getStockClass(stock: number): string {
    if (stock === 0) return 'bg-danger';
    if (stock <= 10) return 'bg-warning';
    return 'bg-success';
  }
}