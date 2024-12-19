import {Action} from '@ngrx/store';
import {
  Customer,
  CustomerCommandResponse,
  CustomerSearchRequest,
  PaginatedCustomerList,
  UpsertCustomerRequest
} from 'src/app/core/models/customer.model';

export const GET_ALL_CUSTOMERS = 'GET_ALL_CUSTOMERS';
export const GET_ALL_CUSTOMERS_SUCCESS = 'GET_ALL_CUSTOMERS_SUCCESS';

export const GET_CUSTOMER_COUNT = 'GET_CUSTOMER_COUNT';
export const GET_CUSTOMER_COUNT_SUCCESS = 'GET_CUSTOMER_COUNT_SUCCESS';

export const GET_CUSTOMER_DETAILS = 'GET_CUSTOMER_DETAILS';
export const GET_CUSTOMER_DETAILS_SUCCESS = 'GET_CUSTOMER_DETAILS_SUCCESS';

export const UPSERT_CUSTOMER = 'UPSERT_CUSTOMER';
export const UPSERT_CUSTOMER_SUCCESS = 'UPSERT_CUSTOMER_SUCCESS';
export const UPSERT_CUSTOMER_FAILURE = 'UPSERT_CUSTOMER_FAILURE';

export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';

export const CLEAR_CUSTOMER_COMMAND_RESULT = 'CLEAR_CUSTOMER_COMMAND_RESULT';

export class GetAllCustomers implements Action {
  type: string = GET_ALL_CUSTOMERS;
  constructor(public payload: CustomerSearchRequest) {}
}

export class GetAllCustomerSuccess implements Action {
  type: string = GET_ALL_CUSTOMERS_SUCCESS;
  constructor(public payload: PaginatedCustomerList) {}
}

export class GetCustomerCount implements Action {
  type: string = GET_CUSTOMER_COUNT;
  constructor(public payload?: CustomerSearchRequest) {}
}

export class GetCustomerCountSuccess implements Action {
  type: string = GET_CUSTOMER_COUNT_SUCCESS;
  constructor(public payload: number) {}
}

export class GetCustomerDetails implements Action {
  type: string = GET_CUSTOMER_DETAILS;
  constructor(public payload: string) {}
}

export class GetCustomerDetailsSuccess implements Action {
  type: string = GET_CUSTOMER_DETAILS_SUCCESS;
  constructor(public payload: Customer) {}
}

export class UpsertCustomer implements Action {
  type: string = UPSERT_CUSTOMER;
  constructor(public payload: UpsertCustomerRequest) {}
}

export class UpsertCustomerSuccess implements Action {
  type: string = UPSERT_CUSTOMER_SUCCESS;
  constructor(public payload: CustomerCommandResponse) {}
}

export class UpsertCustomerFailure implements Action {
  type: string = UPSERT_CUSTOMER_FAILURE;
  constructor(public payload: CustomerCommandResponse) {}
}

export class DeleteCustomer implements Action {
  type: string = DELETE_CUSTOMER;
  constructor(public payload: string) {}
}

export class DeleteCustomerSuccess implements Action {
  type: string = DELETE_CUSTOMER_SUCCESS;
  constructor(public payload: CustomerCommandResponse) {}
}

export class DeleteCustomerFailure implements Action {
  type: string = DELETE_CUSTOMER_FAILURE;
  constructor(public payload: CustomerCommandResponse) {}
}

export class ClearCustomerCommandResult implements Action {
  type: string = CLEAR_CUSTOMER_COMMAND_RESULT;
  constructor(public payload?: any) {}
}

export type CustomerActions =
  | GetAllCustomers
  | GetAllCustomerSuccess
  | GetCustomerCount
  | GetCustomerCountSuccess
  | GetCustomerDetails
  | GetCustomerDetailsSuccess
  | UpsertCustomer
  | UpsertCustomerSuccess
  | UpsertCustomerFailure
  | DeleteCustomer
  | DeleteCustomerSuccess
  | DeleteCustomerFailure
  | ClearCustomerCommandResult;
