import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './stock/common/404.component';
import { DefaultLayoutComponent } from './stock/common/container/default-layout.component';
import { AccountLayoutComponent } from './stock/account/container/account-layout.component';
import { RegisterComponent } from './stock/account/components/register/register.component';
import { LoginComponent } from './stock/account/components/login/login.component';
import { OnlyLoggedInUsers } from './services/auth-gaurd.services';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'account', component: AccountLayoutComponent,
    canActivate: [OnlyLoggedInUsers],
    loadChildren: './stock/account/account.module#AccountModule',
  },
  {
    path: 'stock', component: DefaultLayoutComponent,
    canActivate: [OnlyLoggedInUsers],
    loadChildren: "./stock/configration/configration.module#ConfigrationModule"
  },
  {
    path: 'dashboard', component: DefaultLayoutComponent,
    canActivate: [OnlyLoggedInUsers],
    loadChildren: "./stock/common/dashboard/dashboard.module#DashboardModule"
  },
  {
    path: 'products', component: DefaultLayoutComponent,
    canActivate: [OnlyLoggedInUsers],
    loadChildren: "./stock/products/products.module#ProductsModule"
  },
  {
    path: 'inventories', component: DefaultLayoutComponent,
    canActivate: [OnlyLoggedInUsers],
    loadChildren: "./stock/inventory/inventories.module#InventoryModule"
  },
  {
    // purchase orders
    path: 'po', component: DefaultLayoutComponent,
    canActivate: [OnlyLoggedInUsers],
    loadChildren: "./stock/purchase-order/purchase-order.module#PurchaseOrdersModule"
  },

  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
