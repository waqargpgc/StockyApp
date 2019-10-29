import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "404.component.html",
  styleUrls: ["error.component.css"]
})
export class P404Component {
  constructor(private _router: Router) {}
  GoBack() {
    this._router.navigate(["/"]);
  }
}
