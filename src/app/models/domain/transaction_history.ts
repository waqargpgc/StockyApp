import { BaseModel } from './base_model';

export class TransactionHistory extends BaseModel {
    type: string;
    quantity: number;
    invoiceChange: string;
    cumQty: number;
    remarks: string;
    applicationUserId: string;

  }
