import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from './../../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  password: any = "Pass@123";
  username: any = "admin";

  constructor(public _authService: AccountService, private router: Router) { }

  login(form: NgForm) {
    let req$ = this._authService.login(form);

    req$.subscribe(
      resp => {
        let token = (<any>resp).token;
        localStorage.setItem("token", token);
        this._authService.isLoginSubject.next(true);

        this._authService.updateCurrentUser(true);
        this._authService.isInvalidLogin = false;

       this.router.navigate(["/dashboard"]);
        // this.router.navigateByUrl('/dashboard');
      },
      err => {
        this._authService.isInvalidLogin = true;

        localStorage.removeItem("token");
        this._authService.isLoginSubject.next(false);
        this._authService.handleError(err);
      }
    );
  }

}