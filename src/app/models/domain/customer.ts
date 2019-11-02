import { BaseModel } from './base_model';
import { SaleOrder } from './sale_order';

export class Customer extends BaseModel {
    name: string;
    address: string;
    mobile: string;
    phone: string;
    email: string;
    street: string;
    city: string;

    state: string;
    zipCode: string;
    saleOrders: SaleOrder[];
  }
