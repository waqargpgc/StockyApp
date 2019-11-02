import { BaseModel } from './base_model';
import { Product } from './product';

export class Color extends BaseModel {
    name: string;
    description: string;
    colorCode: string;

    products: Product[];
  }
