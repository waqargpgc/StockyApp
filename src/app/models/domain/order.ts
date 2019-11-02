import { BaseModel } from './base_model';
import { OrderStatus } from './order_status';
import { OrderDetail } from './order_detail';


export class Order extends BaseModel {
    orderReference: string;
    discount: number;
    totalAmount: number;
    comments: string;
    status: OrderStatus;

    customerId: number;
    orderDetailList: OrderDetail[];

    // Destructure data from customer
    // needed for instant transaction - a Customer may not always be registered/added.
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    customerMobile: string;
    customerEmail: string;
    customerStreet: string;
    customerCity: string;
    customerState: string;
    customerZipCode: string;
  }
