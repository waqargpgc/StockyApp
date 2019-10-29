import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AddPurchaseOrderComponent } from './components/add-po/add-po.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
const routes: Routes = [
  { path: "", component: PurchaseOrdersComponent },
  { path: "add", component: AddPurchaseOrderComponent }
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
  declarations: [PurchaseOrdersComponent, AddPurchaseOrderComponent]
})
export class PurchaseOrdersModule { }
