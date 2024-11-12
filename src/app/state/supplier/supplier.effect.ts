import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {SupplierService} from 'src/app/core/services/supplier.service';
import * as supplierActions from './supplier.action';
import {SupplierCommadType, SupplierCommandResponse} from 'src/app/core/models/supplier';
import {CommandResultStatus} from 'src/app/core/models/common';

@Injectable({providedIn: 'root'})
export class SupplierEffect {
  constructor(private supplierService: SupplierService, private actions$: Actions) {}

  public fetchSupplierList$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(supplierActions.GET_SUPLIERS),
      switchMap((action: supplierActions.GetSuppliers) => {
        return this.supplierService.getAllSuppliers(action.payload).pipe(
          map(response => {
            return new supplierActions.GetSuppliersSuccess(response);
          }),
          catchError(error => {
            console.log(error);
            throw error;
          })
        );
      })
    );
  });

  public fetchSupplierCount$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(supplierActions.GET_SUPPLIER_COUNT),
      switchMap((action: supplierActions.GetSupplierCount) => {
        return this.supplierService.getSupplierCount(action.payload).pipe(
          map(response => {
            return new supplierActions.GetSupplierCountSuccess(response);
          }),
          catchError(error => {
            console.log(error);
            throw error;
          })
        );
      })
    );
  });

  public fetchSupplierDetails$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(supplierActions.GET_SUPPLIER_DETAILS),
      switchMap((action: supplierActions.GetSupplierDetails) => {
        return this.supplierService.getSupplierDetails(action.payload).pipe(
          map(response => {
            return new supplierActions.GetSupplierDetailsSuccess(response);
          }),
          catchError(error => {
            console.log(error);
            throw error;
          })
        );
      })
    );
  });

  public upsertSupplierCount$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(supplierActions.UPSERT_SUPPLIER),
      switchMap((action: supplierActions.UpsertSupplier) => {
        return this.supplierService.upsertSupplier(action.payload).pipe(
          map(response => {
            const upsertResponse: SupplierCommandResponse = {
              supplierId: response.id,
              commandType: SupplierCommadType.Upsert,
              status: CommandResultStatus.Success,
              error: null
            };
            return new supplierActions.UpsertSupplierSuccess(upsertResponse);
          }),
          catchError(error => {
            console.log(error);
            const upsertResponse: SupplierCommandResponse = {
              supplierId: null,
              commandType: SupplierCommadType.Upsert,
              status: CommandResultStatus.Failure,
              error: error
            };
            return of(new supplierActions.UpsertSupplierFailure(upsertResponse));
          })
        );
      })
    );
  });

  public deleteSupplierDetails$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(supplierActions.DELETE_SUPPLIER),
      switchMap((action: supplierActions.DeleteSupplier) => {
        return this.supplierService.deleteSupplier(action.payload).pipe(
          map(() => {
            const deleteResponse: SupplierCommandResponse = {
              supplierId: null,
              commandType: SupplierCommadType.Delete,
              status: CommandResultStatus.Success,
              error: null
            };
            return new supplierActions.DeleteSupplierSuccess(deleteResponse);
          }),
          catchError(error => {
            console.log(error);
            const deleteResponse: SupplierCommandResponse = {
              supplierId: null,
              commandType: SupplierCommadType.Delete,
              status: CommandResultStatus.Failure,
              error: error
            };
            return of(new supplierActions.DeleteSupplierFailure(deleteResponse));
          })
        );
      })
    );
  });
}
