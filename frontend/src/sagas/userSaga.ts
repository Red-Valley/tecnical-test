import { call, put, all, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  signInFailure,
  signInSuccess,
  userActionTypes,
} from "actions/userActions";

const baseUrl = process.env.REACT_APP_API;

const signInUser = ({ username, password }: ISignIn): any =>
  axios.post<IUser>(`${baseUrl}/user/signin/`, {
    username,
    password,
  });

function* signInUserSaga({ payload }: SignInAction): any {
  try {
    const response = yield call(signInUser, payload);
    yield put(signInSuccess(response.data));
} catch (error) {
    yield put(signInFailure({ error: true }));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userActionTypes.SIGNIN_REQUEST as keyof unknown, signInUserSaga),
  ]);
}
