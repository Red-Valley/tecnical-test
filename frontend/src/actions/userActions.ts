export enum userActionTypes {
  SIGNIN_REQUEST = "SIGNIN_REQUEST",
  SIGNIN_SUCCESS = "SIGNIN_SUCCESS",
  SIGNIN_FAILURE = "SIGNIN_FAILURE",

  PROFILE_REQUEST = "PROFILE_REQUEST",
  PROFILE_SUCCESS = "PROFILE_SUCCESS",
  PROFILE_FAILURE = "PROFILE_FAILURE",

  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "SIGNUP_FAILURE",

  LOGOUT = "LOGOUT"
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

export const profileRequest = (payload: IUserProfile):UserProfileAction => ({
  type: userActionTypes.PROFILE_REQUEST,
  payload,
});

export const profileSuccess = (payload: IUser) => ({
  type: userActionTypes.PROFILE_SUCCESS,
  payload,
});

export const profileFailure = (payload: any) => ({
  type: userActionTypes.PROFILE_FAILURE,
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

export const logoutAction = () => ({
  type: userActionTypes.LOGOUT
});
