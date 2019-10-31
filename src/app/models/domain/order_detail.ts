import { BaseModel } from './base_model';

export class OrderDetail extends BaseModel {
    unitPrice: number;
    quantity: number;
    discount: number;
    productId: string;
    orderId: string;
  }
