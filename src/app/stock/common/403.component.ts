import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "403.component.html",
  styleUrls: ["error.component.css"]
})
export class P403Component {
  constructor(private _router: Router) {}

  GoBack() {
    this._router.navigate(["/"]);
  }
}
