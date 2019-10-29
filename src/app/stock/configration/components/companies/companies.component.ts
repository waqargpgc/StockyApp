import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { ManufacturerService } from './../../../../services/app.services';
import { Brand } from "./.././../../../models/index";
import { debounceTime, pluck, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';
import { PaginationModel } from '../../../../models/common';

@Component({
  selector: "stk-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"]
})

export class CompaniesComponent implements OnInit {
  public company: Brand;
  CompanyList: Brand[] = [];
  public paginationModel: PaginationModel = new PaginationModel();

  public modalHeader: string;
  public submitButton: string;
  constructor(
    private toastr: ToastrService,
    private manufacturerService: ManufacturerService) { }

  ngOnInit() {
    this.company = new Brand();
    this.GetAllManufacturers(this.paginationModel.pageNo, this.paginationModel.pageSize);
    this.searchFilter();

    this.modalHeader = "Add Company";
    this.submitButton = "Save";
  }

  async AddOrUpdateCompany() {
    let req$: any;
    let action = "Added";
    let name = this.company.name;

    if (this.company.id) {
      action = "Updated";
      req$ = this.manufacturerService.update(this.company);
    } else {
      req$ = this.manufacturerService.create(this.company);
    }

    try {
      await this.manufacturerService.getResponseFromSource(req$);

      this.Cancel();
      this.GetAllManufacturers(this.paginationModel.pageNo, this.paginationModel.pageSize);
      this.toastr.success(`${name} ${action} successfully.`);
    } catch (e) {
      // handle error
    }
  }

  // clear fields
  Cancel() {
    //@ts-ignore
    this.company = new Manufacturer();

    this.modalHeader = "Add Company";
    this.submitButton = "Save";
  }

  async GetAllManufacturers(page, pageSize, searchQry = "") {
    this.paginationModel.search = searchQry || this.paginationModel.search;
    this.paginationModel.pageNo = page;
    this.paginationModel.pageSize = pageSize;

    let req$ = this.manufacturerService.list(this.paginationModel);

    try {
      let resp = await this.manufacturerService.getResponseFromSource(req$);
      this.CompanyList = resp;
      this.initPaginationModel(resp.paging);
    } catch (e) {
    }
  }

  Update(manf: Brand) {
    this.company = manf;

    this.modalHeader = "Update Company";
    this.submitButton = "update";
  }

  async Delete(maf: Brand) {
    let isConfirm = confirm(`Delete This supplier ${maf.name} ?.`);
    let id = maf.id;
    if (isConfirm && id) {
      let req$ = this.manufacturerService.delete(id);

      try {
        await this.manufacturerService.getResponseFromSource(req$);
        this.GetAllManufacturers(this.paginationModel.pageNo, this.paginationModel.pageSize);
        this.toastr.success(`${maf.name} deleted successfully.`);
      } catch (e) {

      }
    }
  }

  onPageChange(event) {
    this.paginationModel.pageNo = parseInt(event);
    this.GetAllManufacturers(this.paginationModel.pageNo, this.paginationModel.pageSize);
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
        return this.manufacturerService.list(this.paginationModel);
      })
    );

    source.subscribe(
      (resp: any) => {
        this.CompanyList = resp;
        this.initPaginationModel(resp.paging);
      },
      (err: HttpErrorResponse) => this.manufacturerService.handleError(err)
    );
  }

  initPaginationModel(pagingModel: any) {
    this.paginationModel = pagingModel;
  }
}
