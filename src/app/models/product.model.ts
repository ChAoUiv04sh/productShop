export enum ProductCategory {
  ELECTRONIQUE = 'électronique',
  VETEMENT = 'vêtements',
  MAISON = 'maison',
  SPORT = 'sport'
}

export enum StockStatus {
  EN_STOCK = 'en stock',
  STOCK_LIMITE = 'stock limité',
  RUPTURE = 'rupture'
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}