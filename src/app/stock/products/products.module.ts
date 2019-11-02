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
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
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
    ModalModule,
    RouterModule.forChild(routes),
    ButtonsModule.forRoot(),
  ],
  declarations: [ProductsComponent, AddProductComponent]
})
export class ProductsModule {}
