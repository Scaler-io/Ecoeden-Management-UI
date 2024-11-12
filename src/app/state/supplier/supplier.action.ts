import {Action} from '@ngrx/store';
import {PaginatedSupplierList, Supplier, SupplierSearchRequest, UpsertSupplierRequest, SupplierCommandResponse} from 'src/app/core/models/supplier';

export const GET_SUPLIERS = 'GET_SUPPLIERS';
export const GET_SUPLIERS_SUCCESS = 'GET_SUPPLIERS_SUCCESS';

export const GET_SUPPLIER_COUNT = 'GET_SUPPLIER_COUNT';
export const GET_SUPPLIER_COUNT_SUCCESS = 'GET_SUPPLIER_COUNT_SUCCESS';

export const GET_SUPPLIER_DETAILS = 'GET_SUPPLIER_DETAILS';
export const GET_SUPPLIER_DETAILS_SUCCESS = 'GET_SUPPLIER_DETAILS_SUCCESS';

export const UPSERT_SUPPLIER = 'UPSERT_SUPPLIER';
export const UPSERT_SUPPLIER_SUCCESS = 'UPSERT_SUPPLIER_SUCCESS';
export const UPSERT_SUPPLIER_FAILURE = 'UPSERT_SUPPLIER_FAILURE';

export const DELETE_SUPPLIER = 'DELETE_SUPPLIER';
export const DELETE_SUPPLIER_SUCCESS = 'DELETE_SUPPLIER_SUCCES';
export const DELETE_SUPPLIER_FAILURE = 'DELETE_SUPPLIER_FAILURE';

export class GetSuppliers implements Action {
  type: string = GET_SUPLIERS;
  constructor(public payload: SupplierSearchRequest) {}
}
export class GetSuppliersSuccess implements Action {
  type: string = GET_SUPLIERS_SUCCESS;
  constructor(public payload: PaginatedSupplierList) {}
}
export class GetSupplierCount implements Action {
  type: string = GET_SUPPLIER_COUNT;
  constructor(public payload?: SupplierSearchRequest) {}
}
export class GetSupplierCountSuccess implements Action {
  type: string = GET_SUPPLIER_COUNT_SUCCESS;
  constructor(public payload: number) {}
}
export class GetSupplierDetails implements Action {
  type: string = GET_SUPPLIER_DETAILS;
  constructor(public payload: string) {}
}
export class GetSupplierDetailsSuccess implements Action {
  type: string = GET_SUPPLIER_DETAILS_SUCCESS;
  constructor(public payload: Supplier) {}
}
export class UpsertSupplier implements Action {
  type: string = UPSERT_SUPPLIER;
  constructor(public payload: UpsertSupplierRequest) {}
}
export class UpsertSupplierSuccess implements Action {
  type: string = UPSERT_SUPPLIER_SUCCESS;
  constructor(public payload: SupplierCommandResponse) {}
}
export class UpsertSupplierFailure implements Action {
  type: string = UPSERT_SUPPLIER_FAILURE;
  constructor(public payload: SupplierCommandResponse) {}
}
export class DeleteSupplier implements Action {
  type: string = DELETE_SUPPLIER;
  constructor(public payload: string) {}
}
export class DeleteSupplierSuccess implements Action {
  type: string = DELETE_SUPPLIER_SUCCESS;
  constructor(public payload: SupplierCommandResponse) {}
}
export class DeleteSupplierFailure implements Action {
  type: string = DELETE_SUPPLIER_FAILURE;
  constructor(public payload: SupplierCommandResponse) {}
}

export type SupplierActions =
  | GetSuppliers
  | GetSuppliersSuccess
  | GetSupplierCount
  | GetSupplierCountSuccess
  | GetSupplierDetails
  | GetSupplierDetailsSuccess
  | UpsertSupplier
  | UpsertSupplierSuccess
  | UpsertSupplierFailure
  | DeleteSupplier
  | DeleteSupplierSuccess
  | DeleteSupplierFailure;
