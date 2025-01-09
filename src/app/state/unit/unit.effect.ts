import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {UnitService} from 'src/app/core/services/unit.service';
import {UnitCommadType, UnitCommandResponse} from 'src/app/core/models/unit';
import {CommandResultStatus} from 'src/app/core/models/common';
import * as unitActions from './unit.action';

@Injectable({
  providedIn: 'root'
})
export class UnitEffect {
  constructor(
    private unitService: UnitService,
    private actions$: Actions
  ) {}

  public getAllUnits$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActions.GET_ALL_UNITS),
      switchMap((action: unitActions.GetAllUnits) => {
        return this.unitService.getAllUnits(action.payload).pipe(
          map(response => {
            return new unitActions.GetAllUnitSuccess(response);
          }),
          catchError(error => {
            throw error;
          })
        );
      })
    );
  });

  public getUnitCount$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActions.GET_UNIT_COUNT),
      switchMap((action: unitActions.GetUnitCount) => {
        return this.unitService.getUnitCount(action.payload).pipe(
          map(response => {
            return new unitActions.GetUnitCountSuccess(response);
          }),
          catchError(error => {
            throw error;
          })
        );
      })
    );
  });

  public getUnitDetails$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActions.GET_UNIT_DETAILS),
      switchMap((action: unitActions.GetUnitDetails) => {
        return this.unitService.getUnitDetails(action.payload).pipe(
          map(response => {
            return new unitActions.GetUnitDetailsSuccess(response);
          }),
          catchError(error => {
            throw error;
          })
        );
      })
    );
  });

  public upsertUnit$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActions.UPSERT_UNIT),
      switchMap((action: unitActions.UpsertUnit) => {
        return this.unitService.upsertUnit(action.payload).pipe(
          map(response => {
            const upsertResponse: UnitCommandResponse = {
              unitId: response.id,
              commandType: UnitCommadType.Upsert,
              status: CommandResultStatus.Success,
              error: null
            };
            return new unitActions.UpsertUnitSuccess(upsertResponse);
          }),
          catchError(error => {
            const errorResponse: UnitCommandResponse = {
              unitId: null,
              commandType: UnitCommadType.Upsert,
              status: CommandResultStatus.Failure,
              error: error
            };
            return of(new unitActions.UpsertUnitFailure(errorResponse));
          })
        );
      })
    );
  });

  public deleteUnit$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActions.DELETE_UNIT),
      switchMap((action: unitActions.DeleteUnit) => {
        return this.unitService.deleteunit(action.payload).pipe(
          map(() => {
            const deleteResponse: UnitCommandResponse = {
              unitId: null,
              commandType: UnitCommadType.Delete,
              status: CommandResultStatus.Success,
              error: null
            };
            return new unitActions.DeleteUnitSuccess(deleteResponse);
          }),
          catchError(error => {
            const errorResponse: UnitCommandResponse = {
              unitId: null,
              commandType: UnitCommadType.Delete,
              status: CommandResultStatus.Failure,
              error: error
            };
            return of(new unitActions.DeleteUnitFailure(errorResponse));
          })
        );
      })
    );
  });
}
