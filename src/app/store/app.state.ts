import {
  MOBILE_VIEW_STATE_NAME,
  mobileViewReducer,
  MobileViewState,
} from '../state/mobile-view/mobile-view.reducer';

export interface AppState {
  [MOBILE_VIEW_STATE_NAME]: MobileViewState;
}

export const appReducers = {
  [MOBILE_VIEW_STATE_NAME]: mobileViewReducer,
};
