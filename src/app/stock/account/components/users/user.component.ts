import { Component, OnInit, Input } from "@angular/core";
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
  public roleList: Observable<any[]>;
  public selectedRoleList: any[] = [];
  uersList: any[] = [];
  public paginationModel: PaginationModel = new PaginationModel();
  public user = {
    userName: '',
    email: '',
    password: '',
    // isOwner: true,
    phoneNumber: '',
    firstName: '',
    lastName: '',
    designation: '',
    roles: [],
  }
  @Input() OneUser:any = {};
  public modalHeader: string;
  public Cpassword: string;
  public submitButton: string;
  ShowPassFields: boolean = false;
  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.getUsers(this.paginationModel.currentPage, this.paginationModel.pageSize);
   this.searchFilter();
   if (this.OneUser.type == 'add') {
    this.modalHeader = 'Add User';
    this.submitButton = 'Save';
  }
  else {
    this.getSingleUserRecode();
    this.modalHeader = 'Update User';
    this.submitButton = 'update'
  }
  this.initRoles();
  }

  getUsers(page, pageSize, searchQry = "") {
    searchQry = searchQry || this.paginationModel.search;

    let req$ = this.accountService.getUsers(page, pageSize, searchQry);
    req$.subscribe(
      (resp: any) => {
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
  
  createOrupdateUser() {
    let user = this.user;
    user.roles = this.selectedRoleList;

    if (user.roles.length > 0) user.roles = user.roles.map((r: any) => r.name);
    if (!user.email || !user.firstName || user.roles.length == 0) {
      this.toastr.error('<b>Email, Password, at least 1 Role </b> and <b>first name </b> are required', '', {
        timeOut: 1000 * 10, //10 seconds
        positionClass: 'toast-bottom-full-width',
        progressBar: true,
        extendedTimeOut: 1000 * 5,
        enableHtml: true,
      });

      return;
    }
    if (this.OneUser.type == 'add') {
    let req$ = this.accountService.createUser(user);
    req$.subscribe(
      (resp: any) => {
        this.toastr.success('Created', '');
      },
      (err: HttpErrorResponse) => this.accountService.handleError(err)
    )
  }else
  {
    let req$ = this.accountService.updateUser(user);

    req$.subscribe(
      (resp: any) => {
        this.toastr.success('Updated', '');
      },
      (err: HttpErrorResponse) => this.accountService.handleError(err)
    )
  }
}
getSingleUserRecode() {
  let id =  this.OneUser.userId;
  let req$ = this.accountService.getSingleUser(id);
  req$.subscribe(
    (resp) => {
        this.user = resp.data;
        this.selectedRoleList = resp.data.roles;
    },
    (err: HttpErrorResponse) => {
        this.accountService.handleError(err);
    }
)
}
  initRoles() {
    let req$ = this.accountService.getRolesForUser();
    req$ = req$.pipe(
      map((resp: any) => {
        let data = resp.data;
        let roles = [];

        data.forEach((r: any) => {
          let role: any = {};
          role.name = r.name;
          role.displayName = r.displayName;

          roles.push(role);
        });

        return roles;
      })
    );

    this.roleList = req$;
  }
  ConfirmPass(value){
    if(value != this.user.password){
      this.toastr.warning('Password and Confirm Password Are Mismatch');
      this.user.password = '';
      this.Cpassword = '';
    }
  }
  ShowPasswordFields(){
      this.ShowPassFields = !this.ShowPassFields;
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
