import { PaginatedUserList, User, UserSummary } from 'src/app/core/models/user';
import * as userActions from './user.action';

export const USER_STATE_NAME = 'user';

export interface UserState {
  user: User;
  users: UserSummary[];
  count: number;
  top: number;
  currentPage: number;
}

const initialState: UserState = {
  user: null,
  users: [],
  count: 0,
  top: 0,
  currentPage: 0,
};

export function userReducer(
  state: UserState = initialState,
  action: userActions.UserActions
): UserState {
  switch (action.type) {
    case userActions.USER_LIST_FETCH:
      return {
        ...state,
        top: 0,
        count: 0,
        currentPage: 0,
        users: [],
      };
    case userActions.USER_LIST_FETCH_SUCCESS:
      return {
        ...state,
        top: (action.payload as PaginatedUserList).pageSize,
        count: (action.payload as PaginatedUserList).count,
        currentPage: (action.payload as PaginatedUserList).pageIndex,
        users: (action.payload as PaginatedUserList).data,
      };
    case userActions.USER_DETAILS_FETCH:
      return {
        ...state,
        user: null,
      };
    case userActions.USER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload as User,
      };
    default:
      return state;
  }
}
