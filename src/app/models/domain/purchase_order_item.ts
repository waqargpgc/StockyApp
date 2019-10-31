import { BaseModel } from './base_model';
import { PurchaseOrder } from './purchase_order';
import { Product } from './product';

export class PurchaseOrderItem extends BaseModel {
    unitPrice: number;
    quantity: number;
    discount: number;
    PurchaseOrderId: string;
    ProductId: string;
    purchaseOrder: PurchaseOrder;
    product: Product;
  }
