import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { ApiEndPoints } from './../models/constants';
import { HttpSetup } from './../models/common';

// ProductService
@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpBaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, new HttpSetup(ApiEndPoints.Products, ApiEndPoints.ApiRoot));
  }
}

// InventoryService
@Injectable({
  providedIn: 'root'
})
export class InventoryService extends HttpBaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, new HttpSetup(ApiEndPoints.Inventories, ApiEndPoints.ApiRoot));
  }
}

// CustomerService
@Injectable({
  providedIn: 'root'
})
export class CustomerService extends HttpBaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient, new HttpSetup(ApiEndPoints.Customers, ApiEndPoints.ApiRoot));
  }
}

// InventoryLocationService
@Injectable({
  providedIn: 'root'
})
export class InventoryLocationService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.Locations, ApiEndPoints.ApiRoot));
  }
}

// // SupplierService
// @Injectable({
//   providedIn: 'root'
// })
// export class SupplierService extends HttpBaseService {
//   constructor(httpClient: HttpClient ) {
//     super(httpClient, new HttpSetup(ApiEndPoints.Suppliers, ApiEndPoints.ApiRoot));
//   }
// }

// ManufacturerService
@Injectable({
  providedIn: 'root'
})
export class ManufacturerService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.Companies, ApiEndPoints.ApiRoot));
  }
}

// ProductCategoryService
@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.ProductCategories, ApiEndPoints.ApiRoot));
  }
}
// ProductSizeService
@Injectable({
  providedIn: 'root'
})
export class SizeService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.Sizes, ApiEndPoints.ApiRoot));
  }
}
// ProductLocationService
@Injectable({
  providedIn: 'root'
})
export class LocationService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.Locations, ApiEndPoints.ApiRoot));
  }
}
// ProductSupplierService
@Injectable({
  providedIn: 'root'
})
export class SupplierService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.Suppliers, ApiEndPoints.ApiRoot));
  }
}
// ProductColorService
@Injectable({
  providedIn: 'root'
})
export class ColorService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.Colors, ApiEndPoints.ApiRoot));
  }
}
// ProductBrandService
@Injectable({
  providedIn: 'root'
})
export class BrandService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.Brands, ApiEndPoints.ApiRoot));
  }
}
// PurchaseOrderService
@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.PurchaseOrders, ApiEndPoints.ApiRoot));
  }
}

// PurchaseOrderItemService
@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderItemService extends HttpBaseService {
  constructor(httpClient: HttpClient ) {
    super(httpClient, new HttpSetup(ApiEndPoints.PurchaseOrderItems, ApiEndPoints.ApiRoot));
  }
  
}
