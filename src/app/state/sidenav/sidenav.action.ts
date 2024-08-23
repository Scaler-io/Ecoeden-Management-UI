import { Action } from '@ngrx/store';

export const SIDENAV_STATE_TOGGLE = 'SIDENAV_STATE_TOGGLE';

export class ToggleSideNav implements Action {
  type: string = SIDENAV_STATE_TOGGLE;
  constructor() {}
}

export type SidenavActions = ToggleSideNav;
