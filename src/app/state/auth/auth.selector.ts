import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_STATE_NAME, AuthState } from './auth.reducer';

const authState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getLoggedInUser = createSelector(authState, (state) => {
  return state.user;
});
