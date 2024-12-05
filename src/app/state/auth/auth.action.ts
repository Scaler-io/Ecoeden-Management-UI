import {Action} from '@ngrx/store';
import {LoginResponse} from 'angular-auth-oidc-client';

export const SET_AUTH_STATE = 'SET_AUTH_STATE';

export class SetAuthState implements Action {
  type: string = SET_AUTH_STATE;
  constructor(public payload: LoginResponse) {}
}

export type AuthActions = SetAuthState;
