import { BaseModel } from './base_model';
import { PurchaseOrder } from './purchase_order';
import { ProductSupplier } from './product_supplier';

export class Supplier extends BaseModel {
    name: string;

    address: string;
    mobile: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    purchaseOrders: PurchaseOrder[];
    productSuppliers: ProductSupplier[];
  }
