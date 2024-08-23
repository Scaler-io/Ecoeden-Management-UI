import * as mobileActions from './mobile-view.action';

export const MOBILE_VIEW_STATE_NAME = 'mobileView';

export interface MobileViewState {
  isMobileView: boolean;
}

const initialState: MobileViewState = {
  isMobileView: false,
};

export function mobileViewReducer(
  state: MobileViewState = initialState,
  action: mobileActions.MobileViewActions
) {
  switch (action.type) {
    case mobileActions.SET_MOBILE_VIEW:
      return {
        ...state,
        isMobileView: action.payload,
      };
    default:
      return state;
  }
}
