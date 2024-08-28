import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

import * as userActions from './user.action';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStateEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  public fetchUserList$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.USER_LIST_FETCH),
      switchMap((action: userActions.UserListFetch) => {
        return this.userService.getAllUsers(action.payload).pipe(
          map((response) => {
            return new userActions.UserListFetchSuccess(response);
          }),
          catchError((error) => {
            console.log(error);
            throw error;
          })
        );
      })
    );
  });

  public fetchUserDetails$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.USER_DETAILS_FETCH),
      switchMap((action: userActions.UserDetailsFetch) => {
        return this.userService.getUserDetails(action.payload).pipe(
          map((response) => {
            return new userActions.UserDetailsFetchSuccess(response);
          }),
          catchError((error) => {
            console.log(error);
            throw error;
          })
        );
      })
    );
  });
}
