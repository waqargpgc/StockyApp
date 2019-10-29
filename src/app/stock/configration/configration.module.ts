import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from "@angular/router";
import { CompaniesComponent } from "./components/companies/companies.component";
import { InventoryLocationComponent } from "./components/inventory-location/inventory-location.component";
import { SupplierComponent } from "./components/supplier/supplier.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { ProductcategoriesComponent } from './components/productcategories/productcategories.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { PaginationModule } from 'ngx-bootstrap/pagination';
const routes: Routes = [
  {
    path: "",
    redirectTo: "companies",
    pathMatch: "full",
    data: { title: "Companies" }
  },
  {
    path: "companies",
    component: CompaniesComponent,
    pathMatch: "full",
    data: { title: "Companies" }
  },

  {
    path: "suppliers",
    component: SupplierComponent,
    pathMatch: "full",
    data: { title: "Suppliers" }
  },
  {
    path: "inventoryLocation",
    component: InventoryLocationComponent,
    pathMatch: "full",
    data: { title: "Inventory Location" }
  },
  {
    path: "categories",
    component: ProductcategoriesComponent,
    pathMatch: "full",
    data: { title: "Categories" }
  },
  {
    path: "customers",
    component: CustomersComponent,
    pathMatch: "full",
    data: { title: "Customers" }
  }
];
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    BsDropdownModule,
    SharedModule,
    RouterModule.forChild(routes),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    CompaniesComponent,
    InventoryLocationComponent,
    SupplierComponent,
    CustomersComponent,
    ProductcategoriesComponent
  ]
})
export class ConfigrationModule {}
