import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[];
  toaster = inject(ToastrService);

  // Connect with service layer
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    // Use data from observable (subscribe)
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data; // Get data from array
    });
  }

  // Edit function
  editProduct(id: number) {
    this.router.navigate(['edit-product', id]);
  }

  // Delete function
  deleteProduct(id: number) {
    // Delete product by id, subscribe to process data
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        this.toaster.info("Producto eliminado correctamente");
        this.getAllProducts();
      },
      error: (error: any) => {
        this.toaster.error(error, "Error");
        console.log(error);
      },
    });
  }
}
