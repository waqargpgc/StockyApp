import { BaseModel } from './base_model';
import { Product } from './product';

export class Stock extends BaseModel {
    quantity: number;
    locationId: string;
    location: Location;
    productId: string;
    product: Product;
  }
