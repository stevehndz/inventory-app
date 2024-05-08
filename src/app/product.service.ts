import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Base url to manage product routes
  private urlBase = 'http://localhost:8080/inventory-app/products';

  constructor(private clientHttp: HttpClient) {}

  // Get all products from get request
  getAllProducts(): Observable<Product[]> {
    return this.clientHttp.get<Product[]>(this.urlBase);
  }

  // Post or add a new product
  addProduct(product: Product): Observable<Object> {
    return this.clientHttp.post(this.urlBase, product);
  }

  // Get product data by id, action with edit button
  getProductById(id: number) {
    return this.clientHttp.get<Product>(`${this.urlBase}/${id}`);
  }

  // Edit product method, requires id and product data
  editProduct(id: number, product: Product): Observable<Object> {
    return this.clientHttp.put(`${this.urlBase}/${id}`, product);
  }

  // Delete product method, requires id to get specific product
  deleteProduct(id: number): Observable<Object> {
    return this.clientHttp.delete(`${this.urlBase}/${id}`);
  }
}
