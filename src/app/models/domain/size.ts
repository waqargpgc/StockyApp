import { BaseModel } from './base_model';
import { Product } from './product';

export class Size extends BaseModel {
    name: string;
    description: string;
    products: Product[];
  }
