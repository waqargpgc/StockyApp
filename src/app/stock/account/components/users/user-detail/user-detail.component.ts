import { Component, OnInit, OnDestroy, Input, } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from './../../../../../services/account.service';

@Component({
  selector: 'stk-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userInfo: any;
  @Input() User:any = {};
  constructor(private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService,
    ) { }


    ngOnInit() {
        this.getUserInfo();
    }

    ngOnDestroy() {
    }

    async getUserInfo(): Promise<void> {
       // const id = this.route.snapshot.paramMap.get('id');
        const id = this.User.userId;
        let req$ = this.accountService.getSingleUser(id);
        let resp = await this.accountService.getResponseFromSource(req$);
        req$.subscribe(
            (resp) => {
              this.userInfo = resp.data;
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
