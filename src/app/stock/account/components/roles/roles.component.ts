import { AccountService } from "./../../../../services/account.service";
import { Component, OnInit, ElementRef, Renderer, Input } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { RoleDetailComponent } from "./role-detail/role-detail.component";
import { PermissionGroup, PaginationModel } from "./../../../../models/common";

import {
  map,
  filter,
  pluck,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  take
} from "rxjs/operators";
import { Observable, throwError, fromEvent, from } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  templateUrl: "roles.component.html"
})
export class RolesComponent implements OnInit {
  public roles: any[] = [];

  public paginationModel: PaginationModel = new PaginationModel();

  public permissionArray: PermissionGroup[];
  public modalHeader: string;
  public submitButton: string;
  public Roleform: FormGroup;
  rolename: any = "";
  roleId: any = "";

  constructor(
    fb: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private renderer: Renderer,
    private elem: ElementRef
  ) {
    this.Roleform = fb.group({
      rolename: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.GetAllRoles(this.paginationModel.currentPage, this.paginationModel.pageSize);
    this.searchFilter();
    this.getPermissions();
    this.modalHeader = "Add Roles";
    this.submitButton = "Save";
  }

  GetAllRoles(page, pageSize, searchQry = "") {
    searchQry = searchQry || this.paginationModel.search;

    let req$ = this.accountService.getRoles(page, pageSize, searchQry);
    req$.subscribe(
      (resp: any) => {
        let roles = resp.data.results;
        this.roles = roles;
        this.paginationModel.totalRecords = resp.data.totalRecords;
        this.initPaginationModel(resp.data);

        // currentPage, firstRecordOnPage, hasNext, hasPrevious, lastRecordOnPage, totalPages, totalRecords, pageSize
      },
      (err: HttpErrorResponse) => this.accountService.handleError(err)
    );
  }

  getPermissions() {
    let req$ = this.accountService.getAllPermission();
    req$.subscribe((data: any) => {
      this.permissionArray = data;
      console.log("all ::", this.permissionArray);
    });
  }

  // Delete Role
  deleteUser(role: any) {
    let isConfirm = confirm(`Delete This Role ${role.displayName} ?.`);
    let id = role.id;
    if (isConfirm && id) {
      let req$ = this.accountService.deleteRole(id);
      req$.subscribe(
        (resp: any) => {
          this.GetAllRoles(this.paginationModel.currentPage, this.paginationModel.pageSize);
          this.toastr.success(`${role.displayName} deleted successfully.`);
        },
        (err: HttpErrorResponse) => {
          this.accountService.handleError(err);
        }
      );
    }
  }
  // Delete Role
  // update Role
  UpdateRole(role) {
    // this.getSingleRole(role.id);
    this.modalHeader = "Update Roles";
    this.submitButton = "update";
    let req$ = this.accountService.getSingleRole(role.id);
    req$.subscribe((data: any) => {
      // this.permissionArray = data.data.claims;
      this.checkAssignedPermissions(data.data.claims);

      this.rolename = data.data.displayName;
      this.roleId = role.id;
    });
  }
  // update Role
  // clear fields
  Cancel() {
    this.rolename = "";
    // this.permissionArray = this.permissionArrayCopy;
    this.selectNone();
    this.modalHeader = "Add Roles";
    this.submitButton = "Save";
  }
  // clear fields

  public AddOrUpdateRole(type) {
    try {
      if (!this.rolename) {
        this.toastr.error("Role name is required", "", {
          timeOut: 1000 * 10, //10 seconds
          positionClass: "toast-bottom-full-width",
          progressBar: true
        });

        return;
      }

      let selectedPermissions = [];
      let permissionInputs = this.elem.nativeElement.querySelectorAll(
        "input.permission-item"
      );

      // filter selected permissions
      permissionInputs.forEach((ele: any) => {
        if (ele.checked) selectedPermissions.push(ele.value);
      });

      let role = {
        roleName: this.rolename,
        displayName: this.rolename,
        id: this.roleId,
        isActive: true,
        claims: selectedPermissions
      };

      if (type == "Save") {
        let req$ = this.accountService.createRole(role);
        req$.subscribe(
          (resp: any) => {
            if (resp.success) {
              this.GetAllRoles(this.paginationModel.currentPage, this.paginationModel.pageSize);
              this.toastr.success(`${resp.data.role} Created successfully.`);
              this.Cancel();
            }
          },
          (err: HttpErrorResponse) => this.accountService.handleError(err)
        );
      } else {
        let req$ = this.accountService.updateRole(role);
        req$.subscribe(
          (resp: any) => {
            this.GetAllRoles(this.paginationModel.currentPage, this.paginationModel.pageSize);
            this.toastr.success(`${resp.data.role} Update successfully.`);
            this.Cancel();
          },
          (err: HttpErrorResponse) => this.accountService.handleError(err)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  // search by role name
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

        return this.accountService.getRoles(
          this.paginationModel.currentPage,
          this.paginationModel.pageSize,
          this.paginationModel.search
        );
      })
    );

    source.subscribe(
      (resp: any) => {
        this.roles = resp.data.results;
        this.paginationModel.totalRecords = resp.data.totalRecords;
      },
      (err: HttpErrorResponse) => this.accountService.handleError(err)
    );
  }

  selectGroup(event: any) {
    let target = event.target || event.srcElement || event.currentTarget;
    let attrValue = target.attributes.id.value;
    //var value = attrValue.nodeValue;

    let domQuery = `input.permission-item.${attrValue}`;
    let elements = this.elem.nativeElement.querySelectorAll(domQuery);

    elements.forEach((x: any) => (x.checked = !x.checked));
  }

  selectAll(): void {
    let elements = this.elem.nativeElement.querySelectorAll(
      "input.permission-item"
    );
    elements.forEach((ele: any) => {
      ele.checked = true;
    });
  }

  selectNone(): void {
    let elements = this.elem.nativeElement.querySelectorAll(
      "input.permission-item"
    );
    elements.forEach((ele: any) => {
      ele.checked = false;
    });
  }

  checkAssignedPermissions(selectedPermissions: any[]): void {
    let permissionList = [];
    selectedPermissions.forEach(p => {
      p.permissions.forEach(per => {
        permissionList.push(per.value);
      });
    });

    // let permissionList = selectedPermissions.map(p => p.value);
    let elements = this.elem.nativeElement.querySelectorAll(
      "input.permission-item"
    );

    elements.forEach((ele: any) => {
      if (permissionList.includes(ele.value)) {
        ele.checked = true;
      } else {
        ele.checked = false;
      }
    });
  }

  

  onPageChange(event) {
    this.paginationModel.currentPage = parseInt(event);
    this.GetAllRoles(this.paginationModel.currentPage, this.paginationModel.pageSize, this.paginationModel.search);
  }

  initPaginationModel(respData: any) {
    this.paginationModel = respData;
  }

  // openRoleDetailModal(role) {
  //   const modalRef = this._modalService.open(
  //     RoleDetailComponent,
  //     this.ngbModalOptions
  //   );
  //   modalRef.componentInstance.role = {
  //     roleId: role.id
  //   };
  // }
}
