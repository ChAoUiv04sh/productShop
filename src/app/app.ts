import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, CartItem, ProductCategory } from './models/product.model';
import { ProductFilter } from '../app/components/product-filter/product-filter';
import { ProductList} from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductFilter, ProductList],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
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
      description: 'Le dernier flagship avec 5G, écran OLED 120Hz et charge rapide 65W.',
      tags: ['5G', 'OLED', '128Go', 'NFC', 'Rapide'],
      imageUrl: 'https://picsum.photos/id/0/300/200'
    },
    {
      id: 2,
      name: 'Casque Audio Sans Fil',
      brand: 'SoundMaster',
      category: ProductCategory.ELECTRONIQUE,
      price: 89,
      originalPrice: 129,
      stock: 8,
      rating: 4.3,
      reviewCount: 156,
      description: 'Casque Bluetooth avec réduction de bruit active.',
      tags: ['Bluetooth', 'ANC', 'Batterie 20h'],
      imageUrl: 'https://picsum.photos/id/1/300/200'
    },
    {
      id: 3,
      name: 'T-shirt Coton Bio',
      brand: 'EcoWear',
      category: ProductCategory.VETEMENT,
      price: 29,
      stock: 25,
      rating: 4.5,
      reviewCount: 89,
      description: 'T-shirt en coton biologique, certifié éco-responsable.',
      tags: ['Bio', 'Coton', 'Confortable'],
      imageUrl: 'https://picsum.photos/id/20/300/200'
    },
    {
      id: 4,
      name: 'Lampe LED Connectée',
      brand: 'HomeSmart',
      category: ProductCategory.MAISON,
      price: 45,
      originalPrice: 69,
      stock: 3,
      rating: 4.7,
      reviewCount: 210,
      description: 'Lampe intelligente RGB compatible Alexa et Google Home.',
      tags: ['LED', 'WiFi', 'RGB', 'Smart'],
      imageUrl: 'https://picsum.photos/id/26/300/200'
    },
    {
      id: 5,
      name: 'Chaussures de Running',
      brand: 'SportFlex',
      category: ProductCategory.SPORT,
      price: 120,
      stock: 0,
      rating: 4.4,
      reviewCount: 312,
      description: 'Chaussures légères avec amorti réactif.',
      tags: ['Running', 'Amorti', 'Léger'],
      imageUrl: 'https://picsum.photos/id/0/300/200'
    }
  ];

  // Filters
  searchText = signal('');
  selectedCategory = signal<string>('toutes');
  maxPrice = signal(2000);
  
  // Selection and cart
  selectedProduct: Product | null = null;
  cart: CartItem[] = [];

  // Computed filtered products
  get filteredProducts(): Product[] {
    let filtered = [...this.products];
    
    // Filter by searchText (name or brand, case insensitive)
    const search = this.searchText().toLowerCase().trim();
    if (search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(search) || 
        product.brand.toLowerCase().includes(search)
      );
    }
    
    // Filter by selectedCategory
    const category = this.selectedCategory();
    if (category !== 'toutes') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filter by maxPrice
    filtered = filtered.filter(product => product.price <= this.maxPrice());
    
    return filtered;
  }

  // Getter for cart total
  get cartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  // Getter for today's date
  get today(): Date {
    return new Date();
  }

  // Event handlers
  onProductSelected(product: Product): void {
    this.selectedProduct = product;
  }

  onAddToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  // Update filters from child component
  updateFilters(filters: { searchText: string; selectedCategory: string; maxPrice: number }): void {
    this.searchText.set(filters.searchText);
    this.selectedCategory.set(filters.selectedCategory);
    this.maxPrice.set(filters.maxPrice);
  }
}