import { BaseModel } from './base_model';
import { SaleOrder } from './sale_order';
import { Product } from './product';

export class SaleOrderItem extends BaseModel {
    unitPrice: number;
    quantity: number;
    discount: number;
    productId: string;
    saleOrderId: string;

    saleOrder: SaleOrder;
    product: Product;
  }
