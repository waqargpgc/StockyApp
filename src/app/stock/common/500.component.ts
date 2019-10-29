import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "500.component.html",
  styleUrls: ["error.component.css"]
})
export class P500Component {
  constructor(private _router: Router) {}
  GoBack() {
    this._router.navigate(["/"]);
  }
}
