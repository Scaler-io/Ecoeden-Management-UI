import {CommandResponse} from './common';
import {ContactDetails} from './contact-details';
import {PaginatedResult} from './pagination';
import {SearchRequestBase} from './search-request';
import {TableDataSource} from './table-source';

export class PaginatedCustomerList extends PaginatedResult {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public count: number,
    public data: CustomerSummary[]
  ) {
    super(pageIndex, pageSize, count, data);
  }
}

export interface CustomerSearchRequest extends SearchRequestBase {}

export interface CustomerSummary extends TableDataSource {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: boolean;
  createdOn: Date | null;
  updatedOn: Date | null;
}

export interface Customer {
  id: string;
  name: string;
  contactDetails: ContactDetails;
  status: boolean;
  metadata: MetaData;
}

interface MetaData {
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  updtedBy: string;
}

export interface UpsertCustomerRequest {
  id?: string;
  name: string;
  contactDetails: ContactDetails;
  status: boolean;
}

export interface CustomerCommandResponse extends CommandResponse {}

export enum CustomerCommadType {
  Upsert = 'Customer created or updated',
  Delete = 'Customer deleted'
}

export interface CustomerFormModel {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  streetNumber: string;
  streetName: string;
  streetType: string;
  status?: boolean;
  city: string;
  district: string;
  state: string;
  postCode: string;
}
