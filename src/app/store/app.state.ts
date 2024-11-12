import {AUTH_STATE_NAME, authReducer, AuthState} from '../state/auth/auth.reducer';
import {MOBILE_VIEW_STATE_NAME, mobileViewReducer, MobileViewState} from '../state/mobile-view/mobile-view.reducer';
import {REQUEST_PAGE_STATE_NAME, requestPageReducers, RequestPageState} from '../state/request-page/request-page.reducer';
import {SIDENAV_TOGGLE_STATE_NAME, sidenavToggleReducer, SidenavToggleState} from '../state/sidenav/sidenav.reducer';
import { SUPPLIER_STATE_NAME, SupplierState } from '../state/supplier/supplier.reducer';
import {USER_STATE_NAME, UserState} from '../state/user/user.reducer';

export interface AppState {
  [AUTH_STATE_NAME]: AuthState;
  [MOBILE_VIEW_STATE_NAME]: MobileViewState;
  [SIDENAV_TOGGLE_STATE_NAME]: SidenavToggleState;
  [USER_STATE_NAME]: UserState;
  [SUPPLIER_STATE_NAME]: SupplierState;
  [REQUEST_PAGE_STATE_NAME]: RequestPageState;
}

export const appReducers = {
  [AUTH_STATE_NAME]: authReducer,
  [MOBILE_VIEW_STATE_NAME]: mobileViewReducer,
  [SIDENAV_TOGGLE_STATE_NAME]: sidenavToggleReducer,
  [REQUEST_PAGE_STATE_NAME]: requestPageReducers,
};
