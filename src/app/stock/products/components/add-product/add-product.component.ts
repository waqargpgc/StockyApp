import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { Product, ProductCategory, Supplier } from "./../../../../models/index";
import { ProductService } from './../../../../services/app.services';
import { ProductCategoryService, SupplierService } from './../../../../services/app.services';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../../../../models/constants';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: "stk-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  productEp = ApiEndPoints.Products;
  productCategoryObj: ProductCategory;
  productObj: Product;
  public productCategoryListObs: Observable<ProductCategory[]>;

  constructor(private productService: ProductService, private prodCategorySvc: ProductCategoryService) {}
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  ngOnInit() {
    this.productObj = new Product();
    this.productCategoryObj = new ProductCategory();

    this.loadDropDowns();
  }

  loadDropDowns(){
    this.productCategoryListObs = this.prodCategorySvc.list();
  }

  addProductCategory(){
    if(!this.productCategoryObj.name) return; // raise notification
    let req$ = this.prodCategorySvc.create(this.productCategoryObj);
    req$.subscribe(
      () => {
        this.loadDropDowns();
        this.productCategoryObj = new  ProductCategory();
      }
    )
  }


  createCategory(){
    // todo:  Add validation constraints

    let req$ = this.productService.create(this.productObj, this.productEp);
    req$.subscribe(
     resp => {
       console.log(resp);
     },
     err => {
       this.productService.handleError(err)
    })
  }



}
