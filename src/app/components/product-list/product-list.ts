import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: Product[] = [
    { id: 1, name: 'Smartphone', price: 599, stock: 5, imageUrl: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Casque Audio', price: 89, stock: 0, imageUrl: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Clavier Mécanique', price: 129, stock: 3 },
    { id: 4, name: 'Souris Gaming', price: 49, stock: 0, imageUrl: 'https://via.placeholder.com/200' },
    { id: 5, name: 'Écran 24 pouces', price: 199, stock: 2, imageUrl: 'https://via.placeholder.com/200' }
  ];
}