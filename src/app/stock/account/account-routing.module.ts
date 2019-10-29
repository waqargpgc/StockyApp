import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { P403Component } from "../common/403.component";
import { ProfileComponent } from './components/profile/profile.component';
import { RolesComponent } from './components/roles/roles.component';
import { UserComponent } from './components/users/user.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
const routes: Routes = [
  // redirect routes
  { path: "", redirectTo: "users", pathMatch: "full" },
  { path: "role", redirectTo: "roles", pathMatch: "full" },
  { path: "user", redirectTo: "users", pathMatch: "full" },

  // main routes
  // { path: "login", component: LoginComponent },
  // { path: "register", component: RegisterComponent },
  { path: "forbidden", component: P403Component },
  { path: "roles", component: RolesComponent },
  { path: "users", component: UserComponent },
  { path: "profile", component: ProfileComponent },

  { path: "**", redirectTo: "404", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes),TooltipModule.forRoot()],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
