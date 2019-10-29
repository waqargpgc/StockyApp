import { Component, OnInit, OnDestroy, Input, } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from './../../../../../services/account.service';

@Component({
    selector: 'stk-role-detail',
    templateUrl: './role-detail.component.html',
    styleUrls: ['./role-detail.component.scss']
})

export class RoleDetailComponent implements OnInit, OnDestroy {
    roleInfo: any;
    @Input() role:any = {};
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private accountService: AccountService,
    ) { }

    ngOnInit() {
        this.getRoleInfo();
    }

    ngOnDestroy() {
    }

    getRoleInfo(): void {
       // const id = this.route.snapshot.paramMap.get('id');
       const id = this.role.roleId;
        let req$ = this.accountService.getSingleRole(id);
        req$.subscribe(
            (resp) => {
                this.roleInfo = resp.data;
            },
            (err: HttpErrorResponse) => {
                this.accountService.handleError(err);
            }
        )
    }

    back() {
        this.location.back();
    }
}
