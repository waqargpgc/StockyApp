import { BaseModel } from './base_model';
import { Product } from './product';

export class ProductCategory extends BaseModel {
    name: string;
    description: string;
    icon: string;
    products: Product[];
  }
