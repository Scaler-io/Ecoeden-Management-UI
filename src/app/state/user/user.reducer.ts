import {PaginatedUserList, User, UserCreateResponse, UserSummary} from 'src/app/core/models/user';
import * as userActions from './user.action';

export const USER_STATE_NAME = 'user';

export interface UserState {
  user: User;
  users: UserSummary[];
  count: number;
  top: number;
  currentPage: number;
  totalUsers: number;
  createUserResponse: UserCreateResponse;
}

const initialState: UserState = {
  user: null,
  users: [],
  count: 0,
  top: 0,
  currentPage: 0,
  totalUsers: 0,
  createUserResponse: {
    userId: '',
    status: null
  }
};

export function userReducer(state: UserState = initialState, action: userActions.UserActions): UserState {
  switch (action.type) {
    case userActions.USER_LIST_FETCH:
      return {
        ...state
      };
    case userActions.USER_LIST_FETCH_SUCCESS:
      const {count, data, pageIndex, pageSize} = action.payload as PaginatedUserList;
      return {
        ...state,
        top: pageSize,
        count: count,
        currentPage: pageIndex,
        users: data
      };
    case userActions.USER_DETAILS_FETCH:
      return {
        ...state,
        user: null
      };
    case userActions.USER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload as User
      };
    case userActions.USER_COUNT_FETCH:
      return {
        ...state,
        totalUsers: 0
      };
    case userActions.USER_COUNT_FETCH_SUCCESS:
      return {
        ...state,
        totalUsers: action.payload as number
      };
    case userActions.USER_CREATE_REQUEST:
      return {
        ...state,
        createUserResponse: {userId: '', status: null}
      };
    case userActions.USER_CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        createUserResponse: action.payload
      };
    case userActions.USER_CREATE_REQUEST_FAILURE:
      return {
        ...state,
        createUserResponse: action.payload
      };
    case userActions.ENABLE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          isActive: action.payload
        }
      };
    default:
      return state;
  }
}
