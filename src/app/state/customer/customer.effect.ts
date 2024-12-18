import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {CustomerService} from 'src/app/core/services/customer.service';
import {CustomerCommadType, CustomerCommandResponse} from 'src/app/core/models/customer.model';
import {CommandResultStatus} from 'src/app/core/models/common';
import * as customerActions from './customer.action';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffect {
  constructor(
    private customerService: CustomerService,
    private actions$: Actions
  ) {}

  public getAllCustomers$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.GET_ALL_CUSTOMERS),
      switchMap((action: customerActions.GetAllCustomers) => {
        return this.customerService.getAllCustomers(action.payload).pipe(
          map(response => {
            return new customerActions.GetAllCustomerSuccess(response);
          }),
          catchError(error => {
            throw error;
          })
        );
      })
    );
  });

  public getCustomerCount$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.GET_CUSTOMER_COUNT),
      switchMap((action: customerActions.GetCustomerCount) => {
        return this.customerService.getCustomerCount(action.payload).pipe(
          map(response => {
            return new customerActions.GetCustomerCountSuccess(response);
          }),
          catchError(error => {
            throw error;
          })
        );
      })
    );
  });

  public getCustomerDetails$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.GET_CUSTOMER_DETAILS),
      switchMap((action: customerActions.GetCustomerDetails) => {
        return this.customerService.getCustomerDetails(action.payload).pipe(
          map(response => {
            return new customerActions.GetCustomerDetailsSuccess(response);
          }),
          catchError(error => {
            throw error;
          })
        );
      })
    );
  });

  public upsertCustomer$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.UPSERT_CUSTOMER),
      switchMap((action: customerActions.UpsertCustomer) => {
        return this.customerService.upsertCustomer(action.payload).pipe(
          map(response => {
            const upsertResponse: CustomerCommandResponse = {
              customerId: response.id,
              commandType: CustomerCommadType.Upsert,
              status: CommandResultStatus.Success,
              error: null
            };
            return new customerActions.UpsertCustomerSuccess(upsertResponse);
          }),
          catchError(error => {
            const errorResponse: CustomerCommandResponse = {
              customerId: null,
              commandType: CustomerCommadType.Upsert,
              status: CommandResultStatus.Failure,
              error: error
            };
            return of(new customerActions.UpsertCustomerFailure(errorResponse));
          })
        );
      })
    );
  });

  public deleteCustomer$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActions.DELETE_CUSTOMER),
      switchMap((action: customerActions.DeleteCustomer) => {
        return this.customerService.deletecustomer(action.payload).pipe(
          map(() => {
            const deleteResponse: CustomerCommandResponse = {
              customerId: null,
              commandType: CustomerCommadType.Delete,
              status: CommandResultStatus.Success,
              error: null
            };
            return new customerActions.DeleteCustomerSuccess(deleteResponse);
          }),
          catchError(error => {
            const errorResponse: CustomerCommandResponse = {
              customerId: null,
              commandType: CustomerCommadType.Delete,
              status: CommandResultStatus.Failure,
              error: error
            };
            return of(new customerActions.DeleteCustomerFailure(errorResponse));
          })
        );
      })
    );
  });
}
