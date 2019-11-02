import { BaseModel } from './base_model';
import { Product } from './product';
import { Supplier } from './supplier';

export class ProductSupplier extends BaseModel {
    price: number;
    productId: string;
    product: Product;
    supplierId: string;
    supplier: Supplier;
  }
