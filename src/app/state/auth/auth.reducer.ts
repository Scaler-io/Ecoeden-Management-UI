import {AuthUser} from 'src/app/core/models/auth-user';
import * as authActions from './auth.action';

export const AUTH_STATE_NAME = 'auth';

export interface AuthState {
  user: AuthUser;
  isLoggedIn: boolean;
  token: string;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: ''
};

const parseJson = item => {
  return JSON.parse(item);
};

export function authReducer(state: AuthState = initialState, action: authActions.AuthActions) {
  switch (action.type) {
    case authActions.SET_AUTH_STATE:
      return <AuthState>{
        ...state,
        user: <AuthUser>{
          firstName: action.payload.userData.given_name,
          lastName: action.payload.userData.family_name,
          username: action.payload.userData.name,
          email: action.payload.userData.email,
          roles: parseJson(action.payload.userData.roles),
          permissions: parseJson(action.payload.userData.permissions)
        },
        isLoggedIn: action.payload.isAuthenticated,
        token: action.payload.accessToken
      };
    default:
      return state;
  }
}
