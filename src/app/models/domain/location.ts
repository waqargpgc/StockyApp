import { BaseModel } from './base_model';
import { Inventory } from './inventory';
import { PurchaseOrder } from './purchase_order';
import { Stock } from './stock';
import { Staff } from './staff';

export class Location extends BaseModel {
  name: string;

  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  description:string;
  inventories: Inventory[];
  purchaseOrders: PurchaseOrder[];
  stocks: Stock[];
  staffs: Staff[];
}
