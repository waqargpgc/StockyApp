import { NgModule } from '@angular/core';
import { P500Component } from '../common/500.component';
import { P404Component } from '../common/404.component';

import { FormsModule } from '@angular/forms';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppFooterModule,
  AppHeaderModule,
  AppSidebarModule
} from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';


import { ToastrModule } from 'ngx-toastr';
import { P403Component } from '../common/403.component';
import { ChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  imports: [
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    ChartsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    //DefaultLayoutComponent,
    P404Component,
    P403Component,
    P500Component
  ],

  exports: [
    // export components
    P403Component,
    P404Component,
    P500Component,

    // export modules
   BsDropdownModule,
   TabsModule,
    AppAsideModule,
    AppBreadcrumbModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    NgSelectModule
  ]
})
export class SharedModule { }
