import { Action } from '@ngrx/store';

export const SET_MOBILE_VIEW = 'SET_MOBILE_VIEW';

export class SetMobileView implements Action {
  readonly type = SET_MOBILE_VIEW;
  constructor(public payload: boolean) {}
}

export type MobileViewActions = SetMobileView;
