import {PaginatedSupplierList, Supplier, SupplierSummary, SupplierCommandResponse} from 'src/app/core/models/supplier';
import * as supplierActions from './supplier.action';

export const SUPPLIER_STATE_NAME = 'supplier';

export interface SupplierState {
  supplier: Supplier;
  suppliers: SupplierSummary[];
  count: number;
  top: number;
  currentPage: number;
  totalSuppliers: number;
  supplierCommandResponse: SupplierCommandResponse;
}

const initialState: SupplierState = {
  supplier: null,
  suppliers: [],
  count: 0,
  top: 0,
  currentPage: 0,
  totalSuppliers: 0,
  supplierCommandResponse: null
};

export function supplieReducer(state: SupplierState = initialState, action: supplierActions.SupplierActions): SupplierState {
  switch (action.type) {
    case supplierActions.GET_SUPLIERS:
      return {
        ...state,
        suppliers: []
      };
    case supplierActions.GET_SUPLIERS_SUCCESS:
      const {count, data, pageIndex, pageSize} = action.payload as PaginatedSupplierList;
      return {
        ...state,
        suppliers: data,
        top: pageSize,
        count: count,
        currentPage: pageIndex
      };
    case supplierActions.GET_SUPPLIER_DETAILS:
      return {
        ...state,
        supplier: null
      };
    case supplierActions.GET_SUPPLIER_DETAILS_SUCCESS:
      return {
        ...state,
        supplier: action.payload as Supplier
      };
    case supplierActions.GET_SUPPLIER_COUNT:
      return {
        ...state,
        totalSuppliers: 0
      };
    case supplierActions.GET_SUPPLIER_COUNT_SUCCESS:
      return {
        ...state,
        totalSuppliers: action.payload as number
      };
    case supplierActions.UPSERT_SUPPLIER:
      return {
        ...state,
        supplierCommandResponse: null
      };
    case supplierActions.UPSERT_SUPPLIER_SUCCESS:
      return {
        ...state,
        supplierCommandResponse: action.payload as SupplierCommandResponse
      };
    case supplierActions.UPSERT_SUPPLIER_FAILURE:
      return {
        ...state,
        supplierCommandResponse: action.payload as SupplierCommandResponse
      };
    case supplierActions.DELETE_SUPPLIER:
      return {
        ...state,
        supplierCommandResponse: null
      };
    case supplierActions.DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        supplierCommandResponse: action.payload as SupplierCommandResponse
      };
    default:
      return state;
  }
}
