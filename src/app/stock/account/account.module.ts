import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";


import { AccountRoutingModule } from "./account-routing.module";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoleDetailComponent } from './components/roles/role-detail/role-detail.component';
import { RolesComponent } from './components/roles/roles.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { UserComponent } from './components/users/user.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RolesComponent,
    RoleDetailComponent,
    AddUserComponent,
    UserComponent,
    UserDetailComponent,
  ],
  entryComponents: [
    RoleDetailComponent,
    AddUserComponent,
    UserDetailComponent
  ],
})
export class AccountModule { }
