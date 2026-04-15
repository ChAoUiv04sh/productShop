import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  searchText: string = '';
  selectedCategory: string = 'toutes';
  maxPrice: number = 2000;

  categories: string[] = ['toutes', 'Électronique', 'Mode', 'Maison', 'Sport', 'Livres'];

  @Output() filterChanged = new EventEmitter<{searchText: string, selectedCategory: string, maxPrice: number}>();

  get searchBorderColor(): string {
    return this.searchText && this.searchText.trim() !== '' ? '#22c55e' : '#d1d5db';
  }

  get isFilterDisabled(): boolean {
    return this.searchText === '' && 
           this.selectedCategory === 'toutes' && 
           this.maxPrice === 2000;
  }

  // Add these missing methods
  onSearchChange(): void {
    this.emitFilters();
  }

  onCategoryChange(): void {
    this.emitFilters();
  }

  onPriceChange(): void {
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filterChanged.emit({
      searchText: this.searchText,
      selectedCategory: this.selectedCategory,
      maxPrice: this.maxPrice
    });
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedCategory = 'toutes';
    this.maxPrice = 2000;
    this.emitFilters();
  }

  applyFilter(): void {
    if (!this.isFilterDisabled) {
      this.emitFilters();
      alert(`✅ Filtres appliqués :\n- Recherche : "${this.searchText || '(vide)'}"\n- Catégorie : ${this.selectedCategory}\n- Prix max : ${this.maxPrice} €`);
    }
  }
}