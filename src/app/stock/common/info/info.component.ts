import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { map, tap, groupBy, mergeMap, reduce } from "rxjs/operators";
import { ApiEndPoints } from '../../../models/constants';
import { CustomerService } from './../../../services/app.services';

@Component({
  selector: 'stk-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {
  data: any;
  _accountEP = ApiEndPoints.Account;

  constructor(
    private http: HttpClient,
    private customerService: CustomerService
    ) { }

  ngOnInit() {
  }

  loadSampleUsers() {
    let req = this.http.get(this._accountEP.GetUsers);

    this.displayObservableData(req);
  }

  loadSampleRoles() {
    let req = this.http.get(this._accountEP.GetRoles);

    this.displayObservableData(req);
  }

  loadSamplePermissions() {
    let req = this.http.get(this._accountEP.GetAllPermissions);

    this.displayObservableData(req);
  }

  loadCustomers() {
    let req = this.customerService.list({});

    this.displayObservableData(req);
  }

  displayObservableData(source: Observable<any>) {
    source.subscribe(
      (data) => {
        this.data = data;
        console.log(data);
      }
    ),
      (err: any) => console.error(err)
  }

}
