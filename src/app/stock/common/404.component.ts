import { Component } from "@angular/core";
import { AccountService } from './../../services/account.service';

@Component({
  templateUrl: "404.component.html",
  styleUrls: ["error.component.css"]
})
export class P404Component {
  constructor(public authService: AccountService) {}
  GoBack() {
    this.authService.logout();
  }
}
