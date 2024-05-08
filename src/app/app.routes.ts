import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

// http://localhost:4200/products
export const routes: Routes = [
  // Default route
  {path: "products", component: ProductListComponent},
  {path: "", redirectTo: "products", pathMatch: "full"},
  {path: "add-product", component: AddProductComponent} , // Add product component
  {path: "edit-product/:id", component: EditProductComponent} // Edit product component
];
