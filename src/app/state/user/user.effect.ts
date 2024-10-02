import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {UserService} from 'src/app/core/services/user.service';
import {Injectable} from '@angular/core';

import * as userActions from './user.action';
import {UserCreateResponse, UserCreateStatus} from 'src/app/core/models/user';

@Injectable({providedIn: 'root'})
export class UserStateEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  public fetchUserList$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.USER_LIST_FETCH),
      switchMap((action: userActions.UserListFetch) => {
        return this.userService.getAllUsers(action.payload).pipe(
          map(response => {
            return new userActions.UserListFetchSuccess(response);
          }),
          catchError(error => {
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
          map(response => {
            return new userActions.UserDetailsFetchSuccess(response);
          }),
          catchError(error => {
            console.log(error);
            throw error;
          })
        );
      })
    );
  });

  public fetchUserCount$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.USER_COUNT_FETCH),
      switchMap(() => {
        return this.userService.getUserCount().pipe(
          map(response => {
            return new userActions.UserCountFetchSuccess(response);
          }),
          catchError(error => {
            console.log(error);
            throw error;
          })
        );
      })
    );
  });

  public createUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.USER_CREATE_REQUEST),
      switchMap((action: userActions.UserCreateRequest) => {
        return this.userService.createUser(action.payload).pipe(
          map(response => {
            if (response) {
              const userCreateResponse: UserCreateResponse = {
                userId: response.id,
                status: UserCreateStatus.Success,
                error: null
              };
              return new userActions.UserCreateRequestSuccess(userCreateResponse);
            }
          }),
          catchError(error => {
            if (error) {
              const errorResponse: UserCreateResponse = {
                userId: '',
                error: error,
                status: UserCreateStatus.Failure
              };
              return of(new userActions.UserCreateRequestFailure(errorResponse));
            }
          })
        );
      })
    );
  });

  public enableUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.ENABLE_USER_REQUEST),
      switchMap((action: userActions.EnableUserRequest) => {
        return this.userService.enableUser(action.payload).pipe(
          map(response => {
            return new userActions.EnableUserSuccess(response);
          }),
          catchError(error => {
            if (error) console.log(error);
            throw error;
          })
        );
      })
    );
  });
}
