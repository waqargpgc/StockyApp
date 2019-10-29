import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../../services/account.service';

@Component({
  selector: 'stk-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit {
  avatarUrl = "";

  constructor(public authService: AccountService) { }

  ngOnInit() {
    this.avatarUrl = localStorage.getItem('avatar');
  }

// logout User
  logout(): void {
    this.authService.logout();
  }
}
