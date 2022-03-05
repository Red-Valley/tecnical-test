import { call, put, all, takeLatest, take } from "redux-saga/effects";
import axios from "axios";
import {
  profileFailure,
  profileSuccess,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  userActionTypes,
} from "actions/userActions";
import { BASE_API } from "utils/constants";

const signInUser = ({ username, password }: ISignIn): any =>
  axios.post<IUser>(`${BASE_API}/user/signin/`, {
    username,
    password,
  });

const getUserProfile = ({ token }: IUserProfile): any =>
  axios.post<IUser>(
    `${BASE_API}/user/profile/`,
    {},
    {
      headers: {
        "x-access-token": token,
      },
    }
  );

const signUpUser = (payload: ISignUp): any =>
  axios.post<IUser>(`${BASE_API}/user/`, {
    ...payload,
  });

export function* signInUserSaga({ payload }: SignInAction): any {
  try {
    const response = yield call(signInUser, payload);
    yield put(signInSuccess(response.data));
  } catch (error) {
    yield put(signInFailure({ error: true }));
  }
}

export function* getUserProfileSaga({ payload }: UserProfileAction): any {
  try {
    const response = yield call(getUserProfile, payload);
    yield put(profileSuccess(response.data));
  } catch (error) {
    yield put(profileFailure({ error: true }));
  }
}

export function* signUpUserSaga({ payload }: SignUpAction): any {
  try {
    const response = yield call(signUpUser, payload);
    yield put(signUpSuccess(response.data));
  } catch (error) {
    yield put(signUpFailure({ error: true }));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userActionTypes.PROFILE_REQUEST, getUserProfileSaga),
    takeLatest(userActionTypes.SIGNUP_REQUEST, signUpUserSaga),
    takeLatest(userActionTypes.SIGNIN_REQUEST, signInUserSaga),
    take(userActionTypes.LOGOUT),
  ]);
}
