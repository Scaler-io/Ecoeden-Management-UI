import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MOBILE_VIEW_STATE_NAME, MobileViewState} from './mobile-view.reducer';

const mobileViewState = createFeatureSelector<MobileViewState>(MOBILE_VIEW_STATE_NAME);

export const getMobileViewState = createSelector(mobileViewState, state => {
  return state.isMobileView;
});
