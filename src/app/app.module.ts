import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
const APP_CONTAINERS = [
  DefaultLayoutComponent,
  AccountLayoutComponent
];

// import {
//   AppAsideModule,
//   AppBreadcrumbModule,
//   AppHeaderModule,
//   AppFooterModule,
//   AppSidebarModule,
// } from '@coreui/angular';

// Import routing module
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { RegisterComponent } from './account/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountModule } from './stock/account/account.module';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './stock/shared/shared.module';
import { HttpConfigInterceptor } from './services/httpconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { DefaultLayoutComponent } from './stock/common/container/default-layout.component';
import { AccountLayoutComponent } from './stock/account/container/account-layout.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    AccountModule,
    SharedModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
  ],
  providers: [
    HttpModule,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor, multi: true
  }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
