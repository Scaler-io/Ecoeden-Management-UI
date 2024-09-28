import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USER_STATE_NAME, UserState} from './user.reducer';
import {PaginatedUserList} from 'src/app/core/models/user';

const userState = createFeatureSelector<UserState>(USER_STATE_NAME);

export const getPaginatedUsers = createSelector(userState, state => {
  return <PaginatedUserList>{
    count: state.count,
    pageIndex: state.currentPage,
    pageSize: state.top,
    data: state.users
  };
});

export const getUserDetails = createSelector(userState, state => {
  return state.user;
});

export const getUserCount = createSelector(userState, state => {
  return state.totalUsers;
});

export const getUserCreateResponse = createSelector(userState, state => {
  return state.createUserResponse;
});
