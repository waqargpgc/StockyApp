import { Component, OnInit, ViewChild } from "@angular/core";
import { Product, ProductCategory, Supplier, Brand,Location, Size, Color } from "./../../../../models/index";
import { ProductService } from './../../../../services/app.services';
import { ProductCategoryService } from './../../../../services/app.services';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../../../../models/constants';
@Component({
  selector: "stk-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  public categoryModal;
  public sizeModal;
  public locationModal;
  public supplierModal;
  public colorModal;
  public brandModal;
  productEp = ApiEndPoints.Products;
  productCategoryObj: ProductCategory;
  productBrandObj: Brand;
  productLocationObj: Location;
  productSizeObj: Size;
  productColorObj: Color;
  productSupplierObj: Supplier;
  productObj: Product;
  public productCategoryListObs: Observable<ProductCategory[]>;
  public productLocationListObs: Observable<Location[]>;
  public productBrandListObs: Observable<Brand[]>;
  public productSizeListObs: Observable<Size[]>;
  public productColorListObs: Observable<Color[]>;
  public productSupplierListObs: Observable<Supplier[]>;
  constructor(private productService: ProductService, private prodCategorySvc: ProductCategoryService) {}
  ngOnInit() {
    this.productObj = new Product();
    this.productCategoryObj = new ProductCategory();

    this.loadDropDowns();
  }

  async loadDropDowns(){
    //this.productCategoryListObs = this.prodCategorySvc.list();
    let req = this.productService.list(null, ApiEndPoints.ProductLookups);
    var lookups = await this.productService.getResponseFromSource(req);
    this.productCategoryListObs = lookups.categoryList;
    this.productLocationListObs = lookups.locaionList;
    this.productBrandListObs = lookups.brandList;
    this.productSizeListObs = lookups.sizeList;
    this.productColorListObs = lookups.colorList;
    this.productSupplierListObs = lookups.supplierList;
  }

  addDropdownItems(){
    if(!this.productCategoryObj.name) return; // raise notification
    let req$ = this.prodCategorySvc.create(this.productCategoryObj);
    req$.subscribe(
      () => {
        this.loadDropDowns();
        this.productCategoryObj = new  ProductCategory();
      }
    )
  }


  createProduct(){
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
