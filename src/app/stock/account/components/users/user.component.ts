import { Component, OnInit } from "@angular/core";
import { AddUserComponent } from "./add-user/add-user.component";
import { HttpErrorResponse } from "@angular/common/http";
import { AccountService } from "./../../../../services/account.service";
import { ToastrService } from "ngx-toastr";
import { UserDetailComponent } from "./user-detail/user-detail.component";

import {
  map,
  filter,
  pluck,
  auditTime,
  distinctUntilChanged,
  switchMap,
  tap,
  take,
  debounceTime
} from "rxjs/operators";
import { Observable, throwError, fromEvent, from } from "rxjs";
import { PaginationModel } from './../../../../models/common';

@Component({
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  uersList: any[] = [];
  public paginationModel: PaginationModel = new PaginationModel();

  constructor(
    private toastr: ToastrService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getUsers(this.paginationModel.currentPage, this.paginationModel.pageSize);
   this.searchFilter();
  }

  getUsers(page, pageSize, searchQry = "") {
    searchQry = searchQry || this.paginationModel.search;

    let req$ = this.accountService.getUsers(page, pageSize, searchQry);
    req$.subscribe(
      (resp: any) => {
        debugger
        this.uersList = resp.data.results;
        this.paginationModel.totalRecords = resp.data.totalRecords;

        this.initPaginationModel(resp.data);
      },
      (err: HttpErrorResponse) => this.accountService.handleError(err)
    );
  }

  deleteUser(user: any) {
    let isConfirm = confirm(
      `Delete user ${user.firstName} ${user.lastName} ?.`
    );
    let id = user.id;
    if (isConfirm && id) {
      let req$ = this.accountService.deleteUser(id);

      req$.subscribe(
        (resp: any) => {
          this.getUsers(this.paginationModel.currentPage, this.paginationModel.pageSize);
          this.toastr.success(
            `${user.firstName} ${user.lastName} deleted successfully.`
          );
        },
        (err: HttpErrorResponse) => {
          this.accountService.handleError(err);
        }
      );
    }
  }

  // search by user name
  searchFilter() {
    let searchEle = document.querySelector("#searchFilter");
    let source = fromEvent(searchEle, "keyup");
    source = source.pipe(
      debounceTime(400),
      pluck("target", "value"),
      distinctUntilChanged(),
      // filter((text: string) => text.trim().length > 2),
      switchMap((searchTerm: string) => {
        this.paginationModel.search = searchTerm;

        return this.accountService.getUsers(
          this.paginationModel.currentPage,
          this.paginationModel.pageSize,
          searchTerm
        );
      })
    );

    source.subscribe(
      (resp: any) => {
        this.uersList = resp.data.results;
        this.paginationModel.totalRecords = resp.data.totalRecords;
      },
      (err: HttpErrorResponse) => this.accountService.handleError(err)
    );
  }

  viewUserDetail(id: any) {
    console.log(id);
  }
  onPageChange(event) {
      this.paginationModel.currentPage = parseInt(event);
    this.getUsers(this.paginationModel.currentPage, this.paginationModel.pageSize);
  }

  initPaginationModel(respData: any) {
    delete respData["results"];
    this.paginationModel = respData;
  }

  // ngbModalOptionsSmall: NgbModalOptions = {
  //   backdrop: "static",
  //   keyboard: false,
  //   size: "lg"
  // };

  openAddUserModal() {
    // const modalRef = this._modalService.open(
    //   AddUserComponent,
    //   this.ngbModalOptionsSmall
    // );
    // modalRef.componentInstance.OneUser = {
    //   type: "add"
    // };
    // modalRef.result.then(result => {
    //   console.log(result);
    //   this.getUsers(this.paginationModel.currentPage, this.paginationModel.pageSize);
    // });
  }

  openUpdateUserModal(user) {
    // const modalRef = this._modalService.open(
    //   AddUserComponent,
    //   this.ngbModalOptionsSmall
    // );
    // modalRef.componentInstance.OneUser = {
    //   type: "update",
    //   userId: user.id
    // };
    // modalRef.result.then(result => {
    //   this.getUsers(this.paginationModel.currentPage, this.paginationModel.pageSize);
    // });
  }
  openRoleDetailModal(user) {
    // const modalRef = this._modalService.open(
    //   UserDetailComponent,
    //   this.ngbModalOptionsSmall
    // );
    // modalRef.componentInstance.User = {
    //   userId: user.id
    // };
  }
}
