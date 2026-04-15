import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCategory } from '../../models/product.model';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.css']
})
export class ProductFilter{
  @Output() filtersChanged = new EventEmitter<{ searchText: string; selectedCategory: string; maxPrice: number }>();

  searchText = '';
  selectedCategory = 'toutes';
  maxPrice = 2000;

  categories = ['toutes', ...Object.values(ProductCategory)];

  get isFormEmpty(): boolean {
    return !this.searchText && this.selectedCategory === 'toutes' && this.maxPrice === 2000;
  }

  applyFilters(): void {
    this.filtersChanged.emit({
      searchText: this.searchText,
      selectedCategory: this.selectedCategory,
      maxPrice: this.maxPrice
    });
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedCategory = 'toutes';
    this.maxPrice = 2000;
    this.applyFilters();
  }
}