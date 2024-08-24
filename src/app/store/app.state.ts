import {
  AUTH_STATE_NAME,
  authReducer,
  AuthState,
} from '../state/auth/auth.reducer';
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
  [AUTH_STATE_NAME]: AuthState;
  [MOBILE_VIEW_STATE_NAME]: MobileViewState;
  [SIDENAV_TOGGLE_STATE_NAME]: SidenavToggleState;
}

export const appReducers = {
  [AUTH_STATE_NAME]: authReducer,
  [MOBILE_VIEW_STATE_NAME]: mobileViewReducer,
  [SIDENAV_TOGGLE_STATE_NAME]: sidenavToggleReducer,
};
