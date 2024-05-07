import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

@NgModule({
  imports: [
    HttpClientModule
  ]
})

export class ProductService {
  // Base url to manage product routes
  private urlBase = "http://localhost:8080/inventory-app/products";

  constructor(private clientHttp: HttpClient) { }

  // Get all products from get request
  getAllProducts(): Observable<Product[]> {
    return this.clientHttp.get<Product[]>(this.urlBase);
  }
}
