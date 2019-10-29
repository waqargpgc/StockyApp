import { Component, OnInit, Input, ElementRef, Renderer, ɵConsole } from '@angular/core';
import { AccountService } from './../../../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public roleList: Observable<any[]>;
  public selectedRoleList: any[] = [];

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

  public modalHeader: string;
  public Cpassword: string;
  public submitButton: string;
  @Input() OneUser:any = {};
  ShowPassFields: boolean = false;

  constructor(
    private _accountService: AccountService,
    private toastr: ToastrService,
    private renderer: Renderer,
    private elem: ElementRef) { }

  ngOnInit() {
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
    let req$ = this._accountService.createUser(user);
    req$.subscribe(
      (resp: any) => {
        this.toastr.success('Created', '');
      },
      (err: HttpErrorResponse) => this._accountService.handleError(err)
    )
  }else
  {
    let req$ = this._accountService.updateUser(user);

    req$.subscribe(
      (resp: any) => {
        this.toastr.success('Updated', '');
      },
      (err: HttpErrorResponse) => this._accountService.handleError(err)
    )
  }
}
getSingleUserRecode() {
  let id =  this.OneUser.userId;
  let req$ = this._accountService.getSingleUser(id);
  req$.subscribe(
    (resp) => {
        this.user = resp.data;
        this.selectedRoleList = resp.data.roles;
    },
    (err: HttpErrorResponse) => {
        this._accountService.handleError(err);
    }
)
}
  initRoles() {
    let req$ = this._accountService.getRolesForUser();
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
}
