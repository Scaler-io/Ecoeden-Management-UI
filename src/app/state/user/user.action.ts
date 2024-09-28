import {Action} from '@ngrx/store';
import {User, PaginatedUserList, UserSearchRequest, UserCreateResponse, CreateUserRequest} from 'src/app/core/models/user';

export const USER_LIST_FETCH = 'USER_LIST_FETCH';
export const USER_DETAILS_FETCH = 'USER_DETAILS_FETCH';
export const USER_LIST_FETCH_SUCCESS = 'USER_LIST_FETCH_SUCCESS';
export const USER_DETAILS_FETCH_SUCCESS = 'USER_DETAILS_FETCH_SUCCESS';
export const USER_COUNT_FETCH = 'USER_COUNT_FETCH';
export const USER_COUNT_FETCH_SUCCESS = 'USER_COUNT_FETCH_SUCCESS';

export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';
export const USER_CREATE_REQUEST_SUCCESS = 'USER_CREATE_REQUEST_SUCCESS';
export const USER_CREATE_REQUEST_FAILURE = 'USER_CREATE_REQUEST_FAILURE';

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

export class UserCreateRequest implements Action {
  type: string = USER_CREATE_REQUEST;
  constructor(public payload: CreateUserRequest) {}
}

export class UserCreateRequestSuccess implements Action {
  type: string = USER_CREATE_REQUEST_SUCCESS;
  constructor(public payload: UserCreateResponse) {}
}

export class UserCreateRequestFailure implements Action {
  type: string = USER_CREATE_REQUEST_FAILURE;
  constructor(public payload: UserCreateResponse) {}
}

export type UserActions =
  | UserListFetch
  | UserDetailsFetch
  | UserListFetchSuccess
  | UserDetailsFetchSuccess
  | UserCountFetch
  | UserCountFetchSuccess
  | UserCreateRequest
  | UserCreateRequestSuccess
  | UserCreateRequestFailure;
