export enum userActionTypes {
  SIGNIN_REQUEST = "SIGNIN_REQUEST",
  SIGNIN_SUCCESS = "SIGNIN_SUCCESS",
  SIGNIN_FAILURE = "SIGNIN_FAILURE",

  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",
};

export const signInRequest = (payload: ISignIn):SignInAction => ({
  type: userActionTypes.SIGNIN_REQUEST,
  payload,
});

export const signInSuccess = (payload: IUser) => ({
  type: userActionTypes.SIGNIN_SUCCESS,
  payload,
});

export const signInFailure = (payload: any) => ({
  type: userActionTypes.SIGNIN_FAILURE,
  payload,
});

export const signUpRequest = (payload: ISignUp):SignUpAction => ({
  type: userActionTypes.SIGNUP_REQUEST,
  payload,
});

export const signUpSuccess = (payload: IUser) => ({
  type: userActionTypes.SIGNUP_SUCCESS,
  payload,
});

export const signUpFailure = (payload: any) => ({
  type: userActionTypes.SIGNUP_FAILURE,
  payload,
});
