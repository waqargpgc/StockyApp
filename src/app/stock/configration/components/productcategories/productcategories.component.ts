import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ProductCategoryService } from "./../../../../services/app.services";
import { ProductCategory } from "./../../../../models/index";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'stk-productcategories',
  templateUrl: './productcategories.component.html',
  styleUrls: ['./productcategories.component.scss']
})
export class ProductcategoriesComponent implements OnInit {
  public productCategory: ProductCategory = new ProductCategory();

  public modalHeader: string;
  public submitButton: string;

  productCategoryList: ProductCategory[] = [];
  public totalElements = 0;
  public page: number = 1;
  public pageSize: number = 13;
  public Search: string;

  constructor(
    private toastr: ToastrService,
    public productCategoryService: ProductCategoryService) { }

  ngOnInit() {
    this.GetCategoryList(this.page, this.pageSize);

    this.modalHeader = "Add Category";
    this.submitButton = "Save";
  }

  async AddOrUpdateProductCategory() {
    let req$: any;
    let action = "Added";
    let sup = this.productCategory.name;

    if (this.productCategory.id) {
      action = "Updated";
      req$ = this.productCategoryService.update(this.productCategory);
    } else {
      req$ = this.productCategoryService.create(this.productCategory);
    }

    try {
      await this.productCategoryService.getResponseFromSource(req$);

      this.Cancel();
      this.GetCategoryList(this.page, this.pageSize);
      this.toastr.success(`${sup} ${action} successfully.`);
    } catch (error) {
    }
  }

  // clear fields
  Cancel() {
    this.productCategory = new ProductCategory();
    this.modalHeader = "Add Category";
    this.submitButton = "Save";
  }
  // clear fields

  async GetCategoryList(page, pageSize, searchQry = "") {
    searchQry = searchQry || this.Search;

    let req$ = this.productCategoryService.list();
    try {
      this.productCategoryList = await this.productCategoryService.getResponseFromSource(req$);
    } catch (error) {

    }
  }

  async Delete(sup: any) {
    let isConfirm = confirm(`Delete This Category ${sup.name} ?.`);
    let id = sup.id;
    if (isConfirm && id) {
      let req$ = this.productCategoryService.delete(id);
      try {
        await this.productCategoryService.getResponseFromSource(req$);

        this.GetCategoryList(this.page, this.pageSize);
        this.toastr.success(`${sup.firstName} deleted successfully.`);
      } catch (error) {

      }
    }
  }

  Update(sup: any) {
    this.productCategory = sup;

    this.modalHeader = "Update Category";
    this.submitButton = "update";
  }
}
