import { ProductService } from './../product.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../product';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  product: Product = new Product();
  toaster = inject(ToastrService);

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  onSubmit() {
    this.saveProduct();
  }

  saveProduct() {
    this.productService.addProduct(this.product).subscribe({
      next: (data) => {
        this.toaster.success("Producto agregado correctamente");
        this.goProductList();
      },
      error: (error: any) => {
        this.toaster.error(error, "Error");
        console.log(error);
      },
    });
  }

  // Function to redirect to main page
  goProductList() {
    this.router.navigate(['/products']);
  }
}
