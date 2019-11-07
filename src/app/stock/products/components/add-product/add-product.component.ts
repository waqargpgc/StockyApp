import { Component, OnInit, ViewChild } from "@angular/core";
import { Product, ProductCategory, Supplier, Brand, Location, Size, Color } from "./../../../../models/index";
import { ProductService, BrandService, SizeService, LocationService, ColorService, SupplierService } from './../../../../services/app.services';
import { ProductCategoryService } from './../../../../services/app.services';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../../../../models/constants';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "stk-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  productImageUrl = "";
  public categoryModal;
  public sizeModal;
  public locationModal;
  public supplierModal;
  public colorModal;
  public brandModal;
  public ProducttId;
  private subr:any;
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
  constructor(
    private productService: ProductService,
    private prodCategorySvc: ProductCategoryService,
    private prodSizeSvc: SizeService,
    private prodLocationSvc: LocationService,
    private prodColorSvc: ColorService,
    private prodBrandSvc: BrandService,
    private prodSupplierSvc: SupplierService,
    private route: ActivatedRoute
  ) {
    this.subr = this.route.params.subscribe(params => {
      this.ProducttId = params['id'];
   });
   }
  ngOnInit() {
    
   if(this.ProducttId){
    this.GetOneProduct();
   }
    this.productObj = new Product();
    this.productCategoryObj = new ProductCategory();
    this.productBrandObj = new Brand();
    this.productLocationObj = new Location();
    this.productSizeObj = new Size();
    this.productColorObj = new Color();
    this.productSupplierObj = new Supplier();
    this.productObj = new Product();
    this.loadDropDowns();
  }

  async loadDropDowns() {
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

  addDropdownItems(type) {
    if (type == 'category') {
      if (!this.productCategoryObj.name) return; // raise notification
      let req$ = this.prodCategorySvc.create(this.productCategoryObj);
      req$.subscribe(() => {
        this.loadDropDowns();
        this.productCategoryObj = new ProductCategory();
      }
      )
    } else if (type == 'location') {
      if (!this.productLocationObj.name) return; // raise notification
      let req$ = this.prodLocationSvc.create(this.productLocationObj);
      req$.subscribe(() => {
        this.loadDropDowns();
        this.productLocationObj = new Location();
      }
      )
    } else if (type == 'size') {
      if (!this.productSizeObj.name) return; // raise notification
      let req$ = this.prodSizeSvc.create(this.productSizeObj);
      req$.subscribe(() => {
        this.loadDropDowns();
        this.productSizeObj = new Size();
      }
      )
    } else if (type == 'brand') {
      if (!this.productSupplierObj.name) return; // raise notification
      let req$ = this.prodBrandSvc.create(this.productSupplierObj);
      req$.subscribe(() => {
        this.loadDropDowns();
        this.productBrandObj = new Brand();
      }
      )
    } else if (type == 'supplier') {
      if (!this.productSupplierObj.name) return; // raise notification
      let req$ = this.prodSupplierSvc.create(this.productSupplierObj);
      req$.subscribe(() => {
        this.loadDropDowns();
        this.productSupplierObj = new Supplier();
      }
      )
    } else if (type == 'color') {
      if (!this.productColorObj.name) return; // raise notification
      let req$ = this.prodColorSvc.create(this.productColorObj);
      req$.subscribe(() => {
        this.loadDropDowns();
        this.productColorObj = new Color();
      }
      )
    }
  }
  createProduct() {
    // todo:  Add validation constraints
    if(!this.ProducttId){
      var request$ = this.productService.create(this.productObj, this.productEp);
    }else{
      var request$ = this.productService.update(this.productObj, this.productEp);  
    }
    request$.subscribe(
      resp => {
        console.log(resp);
      },
      err => {
        this.productService.handleError(err)
      })
  }
  GetOneProduct(){
    debugger
    let req$ = this.productService.get(this.ProducttId, this.productEp);  
    req$.subscribe(
    resp => {
      this.productObj = resp;
      console.log(resp);
    },
    err => {
      this.productService.handleError(err)
    })
}
  upload(files) {
    //   if (files.length === 0) return;
    //   const formData = new FormData();
    //   for (let file of files) {
    //     formData.append(file.name, file);
    //   }
    //   let req = this.productService.updateAvatar(formData);
    //   req.subscribe(event => {
    //   })
  }
  ngOnDestroy() {
    this.subr.unsubscribe();
  }
}
