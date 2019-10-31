import { BaseModel } from './base_model';
import { OrderStatus } from './order_status';
import { Supplier } from './supplier';
import { PurchaseOrderItem } from './purchase_order_item';

export class PurchaseOrder extends BaseModel {
    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    status: OrderStatus;
    orderReference: string;
    totalAmount: number;
    comments: string;
    supplierId: string;
    locationId: string;

    supplier: Supplier;
    location: Location;
    purchaseOrderItems: PurchaseOrderItem[];
  }
