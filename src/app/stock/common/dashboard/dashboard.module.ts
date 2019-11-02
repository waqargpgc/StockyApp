import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from '../info/info.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [

{
  path: "",
  component: DashboardComponent,
  data: { title: "Dashboard" }
},
  { path: "play", component: InfoComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    RouterModule.forChild(routes),
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent, InfoComponent ]
})
export class DashboardModule { }
