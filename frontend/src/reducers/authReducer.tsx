import { ResultUser } from "../repository/types";

export enum AuthActionType {
  LOGIN,
  LOGOUT,
}

export type AuthAction =
  | {
      type: AuthActionType.LOGIN;
      payload: ResultUser;
    }
  | {
      type: AuthActionType.LOGOUT;
    }

export interface AuthState {
  user: ResultUser | null;
  authenticated: boolean;
}

const savedState = localStorage.getItem("141274-session");

const initialState: AuthState = savedState
  ? JSON.parse(savedState)
  : {
      user: null,
      authenticated: false,
    };

export const AuthReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        authenticated: true,
        user: action.payload,
      };
    case AuthActionType.LOGOUT:
      return {
        authenticated: false,
        user: null
      };
    default:
      return state;
  }
};
