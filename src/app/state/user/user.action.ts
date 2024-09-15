import {Action} from '@ngrx/store';
import {User, PaginatedUserList, UserSearchRequest} from 'src/app/core/models/user';

export const USER_LIST_FETCH = 'USER_LIST_FETCH';
export const USER_DETAILS_FETCH = 'USER_DETAILS_FETCH';
export const USER_LIST_FETCH_SUCCESS = 'USER_LIST_FETCH_SUCCESS';
export const USER_DETAILS_FETCH_SUCCESS = 'USER_DETAILS_FETCH_SUCCESS';
export const USER_COUNT_FETCH = 'USER_COUNT_FETCH';
export const USER_COUNT_FETCH_SUCCESS = 'USER_COUNT_FETCH_SUCCESS';

export class UserListFetch implements Action {
  type: string = USER_LIST_FETCH;
  constructor(public payload: UserSearchRequest) {}
}

export class UserListFetchSuccess implements Action {
  type: string = USER_LIST_FETCH_SUCCESS;
  constructor(public payload: PaginatedUserList) {}
}

export class UserDetailsFetch implements Action {
  type: string = USER_DETAILS_FETCH;
  constructor(public payload: string) {}
}

export class UserDetailsFetchSuccess implements Action {
  type: string = USER_DETAILS_FETCH_SUCCESS;
  constructor(public payload: User) {}
}

export class UserCountFetch implements Action {
  type: string = USER_COUNT_FETCH;
  constructor(public payload: any = null) {}
}

export class UserCountFetchSuccess implements Action {
  type: string = USER_COUNT_FETCH_SUCCESS;
  constructor(public payload: number) {}
}

export type UserActions = UserListFetch | UserDetailsFetch | UserListFetchSuccess | UserDetailsFetchSuccess | UserCountFetch;
UserCountFetchSuccess;
