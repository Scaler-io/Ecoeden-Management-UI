import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CUSTOMER_STATE_NAME, CustomerState} from './customer.reducer';
import {PaginatedCustomerList} from 'src/app/core/models/customer.model';

const customerState = createFeatureSelector<CustomerState>(CUSTOMER_STATE_NAME);

export const getPaginatedCustomers = createSelector(customerState, state => {
  return <PaginatedCustomerList>{
    count: state.count,
    pageIndex: state.currentPage,
    pageSize: state.top,
    data: state.customers,
  };
});

export const getCustomerDetails = createSelector(customerState, state => {
  return state.customer;
});

export const getCustomerCount = createSelector(customerState, state => {
  return state.totalCustomers;
});

export const getCustomerCommandResponse = createSelector(customerState, state => {
  return state.customerCommandResponse;
});
