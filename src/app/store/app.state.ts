import {
  MOBILE_VIEW_STATE_NAME,
  mobileViewReducer,
  MobileViewState,
} from '../state/mobile-view/mobile-view.reducer';
import {
  SIDENAV_TOGGLE_STATE_NAME,
  sidenavToggleReducer,
  SidenavToggleState,
} from '../state/sidenav/sidenav.reducer';

export interface AppState {
  [MOBILE_VIEW_STATE_NAME]: MobileViewState;
  [SIDENAV_TOGGLE_STATE_NAME]: SidenavToggleState;
}

export const appReducers = {
  [MOBILE_VIEW_STATE_NAME]: mobileViewReducer,
  [SIDENAV_TOGGLE_STATE_NAME]: sidenavToggleReducer,
};
