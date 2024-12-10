import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SUPPLIER_STATE_NAME, SupplierState} from './supplier.reducer';
import {PaginatedSupplierList} from 'src/app/core/models/supplier';

const supplierState = createFeatureSelector<SupplierState>(SUPPLIER_STATE_NAME);

export const getPaginatedSuppliers = createSelector(supplierState, state => {
  return <PaginatedSupplierList>{
    count: state.count,
    pageIndex: state.currentPage,
    pageSize: state.top,
    data: state.suppliers
  };
});

export const getSupplierDetails = createSelector(supplierState, state => {
  return state.supplier;
});

export const getSupplierCount = createSelector(supplierState, state => {
  return state.totalSuppliers;
});

export const getSupplierCommandResponse = createSelector(supplierState, state => {
  return state.supplierCommandResponse;
});
