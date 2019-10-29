import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { SupplierService } from "./../../../../services/app.services";
import { Supplier } from "./../../../../models/index"
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "stk-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.scss"]
})
export class SupplierComponent implements OnInit {
  public supplier: Supplier = new Supplier();

  public modalHeader: string;
  public submitButton: string;

  supplierList: Supplier[] = [];
  public totalElements = 0;
  public page: number = 1;
  public pageSize: number = 13;
  public Search: string;

  constructor(
    private toastr: ToastrService,
    public supplierService: SupplierService) { }

  ngOnInit() {
    this.GetAllSuppliers(this.page, this.pageSize);

    this.modalHeader = "Add Supplier";
    this.submitButton = "Save";
  }

  async AddOrUpdateSupplier() {
    let req$: any;
    let action = "Added";
    let sup = this.supplier.name + " " + this.supplier.name;

    if (this.supplier.id) {
      action = "Updated";
      req$ = this.supplierService.update(this.supplier);
    } else {
      req$ = this.supplierService.create(this.supplier);
    }

    try {
      await this.supplierService.getResponseFromSource(req$);

      this.Cancel();
      this.GetAllSuppliers(this.page, this.pageSize);
      this.toastr.success(`${sup} ${action} successfully.`);
    } catch (error) {
    }
  }

  // clear fields
  Cancel() {
    this.supplier = new Supplier();
    this.modalHeader = "Add Supplier";
    this.submitButton = "Save";
  }
  // clear fields

  async GetAllSuppliers(page, pageSize, searchQry = "") {
    searchQry = searchQry || this.Search;

    // let req$ = this.supplierService.getAll(page, pageSize, searchQry);
    let req$ = this.supplierService.list();
    try {
      this.supplierList = await this.supplierService.getResponseFromSource(req$);
    } catch (error) {

    }
  }

  async Delete(sup: any) {
    let isConfirm = confirm(`Delete This supplier ${sup.firstName} ?.`);
    let id = sup.id;
    if (isConfirm && id) {
      let req$ = this.supplierService.delete(id);
      try {
        await this.supplierService.getResponseFromSource(req$);

        this.GetAllSuppliers(this.page, this.pageSize);
        this.toastr.success(`${sup.firstName} deleted successfully.`);
      } catch (error) {

      }
    }
  }

  Update(sup: any) {
    this.supplier = sup;

    this.modalHeader = "Update Supplier";
    this.submitButton = "update";
  }
}
