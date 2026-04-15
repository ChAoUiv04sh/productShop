import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, CartItem, ProductCategory } from './models/product.model';
import { CommonModule } from '@angular/common';
import { ProductFilter } from './components/product-filter/product-filter';
import { ProductCard } from './components/product-card/product-card';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, ProductFilter, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'ProductsShop';
  today = new Date();
  
  // Filter properties
  searchText: string = '';
  selectedCategory: string = 'toutes';
  maxPrice: number = 2000;
  
  products: Product[] = [
    {
      id: 1,
      name: 'Smartphone XPro 15',
      brand: 'TechVision',
      category: ProductCategory.ELECTRONIQUE,
      price: 799,
      originalPrice: 999,
      stock: 15,
      rating: 4.6,
      reviewCount: 342,
      description: 'Le dernier flagship avec 5G.',
      tags: ['5G', 'OLED', '128Go', 'NFC', 'Rapide']
    },
    {
      id: 2,
      name: 'T-Shirt Sport',
      brand: 'Nike',
      category: ProductCategory.VETEMENT,
      price: 29,
      stock: 50,
      rating: 4.2,
      reviewCount: 120,
      description: 'T-shirt confortable pour sport.',
      tags: ['sport', 'cotton']
    },
    {
      id: 3,
      name: 'Aspirateur Pro',
      brand: 'HomeClean',
      category: ProductCategory.MAISON,
      price: 199,
      stock: 8,
      rating: 4.1,
      reviewCount: 87,
      description: 'Nettoyage puissant.',
      tags: ['clean', 'home']
    },
    {
      id: 4,
      name: 'Chaussures Running',
      brand: 'Adidas',
      category: ProductCategory.SPORT,
      price: 120,
      originalPrice: 150,
      stock: 0,
      rating: 4.7,
      reviewCount: 400,
      description: 'Confort pour course.',
      tags: ['run', 'light']
    },
    {
      id: 5,
      name: 'Laptop Ultra',
      brand: 'Dell',
      category: ProductCategory.ELECTRONIQUE,
      price: 1299,
      stock: 5,
      rating: 4.8,
      reviewCount: 220,
      description: 'Performance haute gamme.',
      tags: ['ssd', '16gb', 'fast']
    }
  ];

  selectedProduct: Product | null = null;
  cart: CartItem[] = [];

  get cartTotal(): number {
    return this.cart.reduce((total, item) =>
      total + item.product.price * item.quantity, 0
    );
  }

  // Computed property for filtered products - THIS SHOWS ON THE PAGE
  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      // Filter by search text
      const matchesSearch = this.searchText === '' || 
        product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchText.toLowerCase());
      
      // Filter by category
      let productCategory = '';
      switch(product.category) {
        case ProductCategory.ELECTRONIQUE:
          productCategory = 'Électronique';
          break;
        case ProductCategory.VETEMENT:
          productCategory = 'Mode';
          break;
        case ProductCategory.MAISON:
          productCategory = 'Maison';
          break;
        case ProductCategory.SPORT:
          productCategory = 'Sport';
          break;
      }
      const matchesCategory = this.selectedCategory === 'toutes' || 
        productCategory === this.selectedCategory;
      
      // Filter by max price
      const matchesPrice = product.price <= this.maxPrice;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }

  // This method receives the filter values from the child component
  onFilterChanged(filters: { searchText: string; selectedCategory: string; maxPrice: number }) {
    this.searchText = filters.searchText;
    this.selectedCategory = filters.selectedCategory;
    this.maxPrice = filters.maxPrice;
  }

  // Helper method to reset all filters from the parent
  resetAllFilters(): void {
    this.searchText = '';
    this.selectedCategory = 'toutes';
    this.maxPrice = 2000;
  }
}