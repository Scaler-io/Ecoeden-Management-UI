import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SIDENAV_TOGGLE_STATE_NAME,
  SidenavToggleState,
} from './sidenav.reducer';

const sidenavToggleState = createFeatureSelector<SidenavToggleState>(
  SIDENAV_TOGGLE_STATE_NAME
);

export const getSidenavToggleState = createSelector(
  sidenavToggleState,
  (state) => {
    return state.expanded;
  }
);
