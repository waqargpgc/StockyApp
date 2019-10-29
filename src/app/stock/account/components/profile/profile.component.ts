import { HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit, ViewChild } from "@angular/core";
import { AccountService } from "./../../../../services/account.service";
import { ToastrService } from "ngx-toastr";
import { ApiEndPoints } from './../../../../models/constants';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: "profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  avatarUrl = "";
  public user: any = {};

  constructor(
    private toastr: ToastrService,
    private accountService: AccountService
  ) { }


  ngOnInit() {
    this.reloadSetting();
  }

  reloadSetting() {
    this.getUser();
    this.initSettings();
    this.avatarUrl = localStorage.getItem('avatar');
  }

  getUser() {
    let req$ = this.accountService.getCurrentUser();

    req$.subscribe(
      (user: any) => this.user = user,
      (err: HttpErrorResponse) => this.accountService.handleError(err)
    )
  }

  upload(files) {
    if (files.length === 0) return;
    const formData = new FormData();

    for (let file of files) {
      formData.append(file.name, file);
    }

    let req = this.accountService.updateAvatar(formData);
    req.subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log(Math.round(100 * event.loaded / event.total));
        //this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response) {
        console.log(event.body);
        localStorage.setItem("avatar", `${ApiEndPoints.ApiRoot}/${event.body.avatarURL}`);
        this.toastr.success("Avatar updated", '');
        this.reloadSetting();
        //this.message = event.body.toString();
      }
    })
  }

  async updateProfile() {
    let model = this.user;
    // __todo:: Add validation/constraints
    delete model["avatarURL"];
    let req = this.accountService.updateProfile(model);
    try {
      await this.accountService.getResponseFromSource(req);
      this.toastr.success("Profile updated", '');
    } catch (error) {

    }
  }

  initSettings() {
    let tabListContainer = document.querySelector("#tablist-container");
    let tabLinks = document.querySelectorAll("#tablist-container a");
    let tabItems = document.querySelectorAll("#tabs-container .tab-item");
    let password = document.querySelector(".tab-item#password");
    password.setAttribute("style", "display: none");

    tabListContainer.addEventListener("click", (ev: any) => {
      tabLinks.forEach(ele => {
        ele.classList.remove('active')
      })

      ev.target.classList.add('active')
      let activeTab = ev.target.dataset.tab;
      if (activeTab) {
        tabItems.forEach((tab: any) => {
          tab.style.display = 'none'

          if (activeTab == tab.id) {
            tab.style.display = 'block';
          }
        });
      }
    })
  }

  imgPreview(eve) {
    this.avatarUrl = eve.target.src;
  }

  async updateSelectedAvatar(img: any) {
    let req$ = this.accountService.update(img, ApiEndPoints.Account.UpdateAvatar);
    try {
      let resp = await this.accountService.getResponseFromSource(req$);
      this.avatarUrl = `${ApiEndPoints.ApiRoot}/${resp.imageURL}`;
      this.toastr.success("Avatar updated", '');

      localStorage.setItem("avatar", `${ApiEndPoints.ApiRoot}/${resp.imageURL}`);
    } catch (error) {

    }
  }
}
