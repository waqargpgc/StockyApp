import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { Routes, RouterModule } from "@angular/router";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { ProductsComponent } from "./components/products/products.component";
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    data: {
      title: "Products"
    }
  },
  {
    path: "add",
    component: AddProductComponent,
    data: {
      title: "Add Product"
    }
  }
];
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    SharedModule,
    BsDropdownModule,
    RouterModule.forChild(routes),
    ButtonsModule.forRoot()
  ],
  declarations: [ProductsComponent, AddProductComponent]
})
export class ProductsModule {}
