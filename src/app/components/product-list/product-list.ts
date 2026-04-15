import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductCard} from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList{
  @Input() products: Product[] = [];
  @Input() selectedId: number | null = null;
  @Output() productSelected = new EventEmitter<Product>();
  @Output() addedToCart = new EventEmitter<Product>();

  onProductSelected(product: Product): void {
    this.productSelected.emit(product);
  }

  onAddToCart(product: Product): void {
    this.addedToCart.emit(product);
  }
}