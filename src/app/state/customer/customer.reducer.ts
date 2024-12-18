import {Customer, CustomerCommandResponse, CustomerSummary, PaginatedCustomerList} from 'src/app/core/models/customer.model';
import * as customerActions from './customer.action';

export const CUSTOMER_STATE_NAME = 'customer';

export interface CustomerState {
  customer: Customer;
  customers: CustomerSummary[];
  count: number;
  top: number;
  currentPage: number;
  totalCustomers: number;
  customerCommandResponse: CustomerCommandResponse;
}

const initialState: CustomerState = {
  customer: null,
  customers: [],
  count: 0,
  currentPage: 0,
  top: 0,
  totalCustomers: 0,
  customerCommandResponse: null
};

export function customerReducer(state: CustomerState = initialState, action: customerActions.CustomerActions): CustomerState {
  switch (action.type) {
    case customerActions.GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: []
      };
    case customerActions.GET_ALL_CUSTOMERS_SUCCESS:
      const {count, data, pageIndex, pageSize} = action.payload as PaginatedCustomerList;
      return {
        ...state,
        customers: data,
        top: pageSize,
        count: count,
        currentPage: pageIndex
      };
    case customerActions.GET_CUSTOMER_DETAILS:
      return {
        ...state,
        customer: null
      };
    case customerActions.GET_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        customer: action.payload as Customer
      };
    case customerActions.UPSERT_CUSTOMER:
      return {
        ...state
      };
    case customerActions.UPSERT_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerCommandResponse: action.payload as CustomerCommandResponse
      };
    case customerActions.UPSERT_CUSTOMER_FAILURE:
      return {
        ...state,
        customerCommandResponse: action.payload as CustomerCommandResponse
      };
    case customerActions.DELETE_CUSTOMER:
      return {
        ...state,
        customerCommandResponse: null
      };
    case customerActions.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerCommandResponse: action.payload as CustomerCommandResponse
      };
    case customerActions.DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        customerCommandResponse: action.payload as CustomerCommandResponse
      };
  }
}
