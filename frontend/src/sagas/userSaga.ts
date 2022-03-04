import { call, put, all, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  userActionTypes,
} from "actions/userActions";

const baseUrl = process.env.REACT_APP_API;

const signInUser = ({ username, password }: ISignIn): any =>
  axios.post<IUser>(`${baseUrl}/user/signin/`, {
    username,
    password,
  });

const signUpUser = (payload: ISignUp): any =>
  axios.post<IUser>(`${baseUrl}/user/`, {
    ...payload,
  });

function* signInUserSaga({ payload }: SignInAction): any {
  try {
    const response = yield call(signInUser, payload);
    yield put(signInSuccess(response.data));
  } catch (error) {
    yield put(signInFailure({ error: true }));
  }
}

function* signUpUserSaga({ payload }: SignUpAction): any {
  try {
    const response = yield call(signUpUser, payload);
    yield put(signUpSuccess(response.data));
  } catch (error) {
    yield put(signUpFailure({ error: true }));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userActionTypes.SIGNUP_REQUEST as keyof unknown, signUpUserSaga),
    takeLatest(userActionTypes.SIGNIN_REQUEST as keyof unknown, signInUserSaga),
  ]);
}
