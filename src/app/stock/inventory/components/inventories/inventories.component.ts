import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "./../../../../services/app.services";
import { Product, ProductCategory } from "./../../../../models/index"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "stk-inventory",
  templateUrl: "./inventories.component.html",
  styleUrls: ["./inventories.component.scss"]
})
export class InventoryComponent implements OnInit {
  public productObj: Product = new Product();

  public modalHeader: string;
  public submitButton: string;

  productList: Product[] = [];
  public totalElements = 0;
  public page: number = 1;
  public pageSize: number = 13;
  public Search: string;

  constructor(
    private toastr: ToastrService,
    public productService: ProductService) { }

  ngOnInit() {
    this.getProducts(this.page, this.pageSize);

    this.modalHeader = "Add Supplier";
    this.submitButton = "Save";
  }

  async AddOrUpdateSupplier() {
    let req$: any;
    let action = "Added";
    let sup =  this.productObj.name;

    if (this.productObj.id) {
      action = "Updated";
      req$ = this.productService.update(this.productObj);
    } else {
      req$ = this.productService.create(this.productObj);
    }

    try {
      await this.productService.getResponseFromSource(req$);

      this.Cancel();
      this.getProducts(this.page, this.pageSize);
      this.toastr.success(`${sup} ${action} successfully.`);
    } catch (error) {
    }
  }

  // clear fields
  Cancel() {
    this.productObj = new Product();
    this.modalHeader = "Add Supplier";
    this.submitButton = "Save";
  }
  // clear fields

  async getProducts(page, pageSize, searchQry = "") {
    searchQry = searchQry || this.Search;

    // let req$ = this.supplierService.getAll(page, pageSize, searchQry);
    let req$ = this.productService.list();
    try {
      this.productList = await this.productService.getResponseFromSource(req$);
    } catch (error) {

    }
  }

  async Delete(item: any) {
    let isConfirm = confirm(`Delete This supplier ${item.firstName} ?.`);
    let id = item.id;
    if (isConfirm && id) {
      let req$ = this.productService.delete(id);
      try {
        await this.productService.getResponseFromSource(req$);

        this.getProducts(this.page, this.pageSize);
        this.toastr.success(`${item.firstName} deleted successfully.`);
      } catch (error) {

      }
    }
  }

  Update(item: any) {
    this.productObj = item;

    this.modalHeader = "Update Supplier";
    this.submitButton = "update";
  }
}
