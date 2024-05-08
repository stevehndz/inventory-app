import { ProductService } from './../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  product: Product = new Product();
  id: number;
  toaster = inject(ToastrService);

  constructor(
    private productService: ProductService,
    private rute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get id from url route
    this.id = this.rute.snapshot.params['id'];
    // Get data from product service
    this.productService.getProductById(this.id).subscribe({
      next: (data) => {
        // In case we found a product
        this.product = data;
      },
      error: (error: any) => {
        // In case we have an error on db
        this.toaster.error(error, 'Error');
        console.log(error);
      },
    });
  }

  onSubmit() {
    // Edit product
    this.saveProduct();
  }

  saveProduct() {
    this.productService.editProduct(this.id, this.product).subscribe({
      next: (data) => {
        this.toaster.success('Producto editado correctamente');
        this.goProductList();
      },
      error: (error: any) => {
        this.toaster.error(error, 'Error');
        console.log(error);
      },
    });
  }

  // Function to redirect to main page
  goProductList() {
    this.router.navigate(['/products']);
  }
}
