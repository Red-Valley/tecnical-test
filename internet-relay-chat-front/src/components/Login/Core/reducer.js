import {
  ON_CHANGE_LOADING,
  ON_CHANGE_LOGIN_INFORMATION,
  ON_CHANGE_SIGN_UP_INFORMATION,
  ON_CHANGE_STEP_VALUE,
  LOGIN_DEFAULT,
  SIGN_UP_DEFAULT,
} from "./actions";

const initialState = {
  loginInformation: LOGIN_DEFAULT,
  signUpInformation: SIGN_UP_DEFAULT,
  loading: false,
  stepValue: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ON_CHANGE_LOADING:
      return { ...state, loading: payload };

    case ON_CHANGE_LOGIN_INFORMATION:
      return {
        ...state,
        loginInformation: { ...state.loginInformation, ...payload },
      };

    case ON_CHANGE_SIGN_UP_INFORMATION:
      return {
        ...state,
        signUpInformation: { ...state.signUpInformation, ...payload },
      };

    case ON_CHANGE_STEP_VALUE:
      return { ...state, stepValue: payload };

    default:
      return state;
  }
};
