import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './product-list.component.html',
})

export class ProductListComponent {
  products: Product[];

  // Connect with service layer
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  private getAllProducts() {
    // Use data from observable (subscribe)
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data; // Get data from array
    });
  }
}
