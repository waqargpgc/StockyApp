import { BaseModel } from './base_model';

export class Staff extends BaseModel {
    name: string;
    phone: string;
    email: string;
    staff: Staff;

    managerId: string;
    locationId: string;
    location: Location;
  }
