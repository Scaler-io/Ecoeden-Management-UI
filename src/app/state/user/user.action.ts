import {Action} from '@ngrx/store';
import {
  User,
  PaginatedUserList,
  UserSearchRequest,
  UserCreateResponse,
  CreateUserRequest,
  RoleUpdateRequest as UserRoleUpdateRequest
} from 'src/app/core/models/user';

export const USER_LIST_FETCH = 'USER_LIST_FETCH';
export const USER_DETAILS_FETCH = 'USER_DETAILS_FETCH';
export const USER_LIST_FETCH_SUCCESS = 'USER_LIST_FETCH_SUCCESS';
export const USER_DETAILS_FETCH_SUCCESS = 'USER_DETAILS_FETCH_SUCCESS';
export const USER_COUNT_FETCH = 'USER_COUNT_FETCH';
export const USER_COUNT_FETCH_SUCCESS = 'USER_COUNT_FETCH_SUCCESS';

export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';
export const USER_CREATE_REQUEST_SUCCESS = 'USER_CREATE_REQUEST_SUCCESS';
export const USER_CREATE_REQUEST_FAILURE = 'USER_CREATE_REQUEST_FAILURE';

export const ENABLE_USER_REQUEST = 'ENABLE_USER_REQUEST';
export const ENABLE_USER_SUCCESS = 'ENABLE_USER_SUCCESS';

export const ROLE_UPDATE_REQUEST = 'ROLE_UPDATE_REQUEST';
export const ROLE_UPDATE_REQUEST_SUCCESS = 'ROLE_UPDATE_SUCCESS';

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
  constructor(public payload?: UserSearchRequest) {}
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

export class EnableUserRequest implements Action {
  type: string = ENABLE_USER_REQUEST;
  constructor(public payload: string) {}
}

export class EnableUserSuccess implements Action {
  type: string = ENABLE_USER_SUCCESS;
  constructor(public payload: boolean) {}
}

export class RoleUpdateRequest implements Action {
  type: string = ROLE_UPDATE_REQUEST;
  constructor(public payload: UserRoleUpdateRequest) {} // used type alias for RoleUpdateRequest as its creating ambiguity
}

export class RoleUpdateRequestSuccess implements Action {
  type: string = ROLE_UPDATE_REQUEST_SUCCESS;
  constructor(public payload: boolean) {}
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
  | UserCreateRequestFailure
  | EnableUserRequest
  | EnableUserSuccess
  | RoleUpdateRequest
  | RoleUpdateRequestSuccess;
