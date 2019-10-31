import { BaseModel } from './base_model';
import { OrderStatus } from './order_status';
import { SaleOrderItem } from './sale_order_item';

export class SaleOrder extends BaseModel {
    orderReference: string;
    totalAmount: number;
    comments: string;
    customerId: string;
    status: OrderStatus;
    orderDate: Date;
    requiredDate: Date;
    shippedDate: Date;
    locationId: string;
    staffId: string;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    customerMobile: string;
    customerEmail: string;
    customerStreet: string;
    customerCity: string;
    customerState: string;
    customerZipCode: string;
    saleOrderItems: SaleOrderItem[];
  }
