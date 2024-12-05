import {CommandResponse} from './common';
import {ContactDetails} from './contact-details';
import {PaginatedResult} from './pagination';
import {SearchRequestBase} from './search-request';
import {TableDataSource} from './table-source';

export class PaginatedSupplierList extends PaginatedResult {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public count: number,
    public data: SupplierSummary[]
  ) {
    super(pageIndex, pageSize, count, data);
  }
}

export interface SupplierSummary extends TableDataSource {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: boolean;
  createdOn: Date | null;
  updatedOn: Date | null;
}

export interface SupplierSearchRequest extends SearchRequestBase {}

export interface Supplier {
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

export interface UpsertSupplierRequest {
  id?: string;
  name: string;
  contactDetails: ContactDetails;
  status: boolean;
}

export interface SupplierCommandResponse extends CommandResponse {}

export enum SupplierCommadType {
  Upsert = 'Supplier created or updated',
  Delete = 'Supplier deleted'
}

export interface SupplierFormModel {
  supplierName: string;
  supplierEmail: string;
  supplierPhone: string;
  streetNumber: string;
  streetName: string;
  streetType: string;
  city: string;
  district: string;
  state: string;
  postCode: string;
}
