import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './components/inventories/inventories.component';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: "**", component: InventoryComponent },
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
  declarations: [InventoryComponent]
})
export class InventoryModule {}
