export const LOGIN_DEFAULT = {
  email: "",
  password: "",
};
export const SIGN_UP_DEFAULT = {
  fullName: "",
  nickname: "",
  password: "",
  rePassword: "",
  email: "",
};

export const ON_CHANGE_LOGIN_INFORMATION = "ON_CHANGE_LOGIN_INFORMATION";
export const ON_CHANGE_SIGN_UP_INFORMATION = "ON_CHANGE_SIGN_UP_INFORMATION";
export const ON_CHANGE_LOADING = "ON_CHANGE_LOADING";
export const ON_CHANGE_STEP_VALUE = "ON_CHANGE_STEP_VALUE";

export const setLoginInformation = (payload) => ({
  type: ON_CHANGE_LOGIN_INFORMATION,
  payload,
});

export const setSingUpInformation = (payload) => ({
  type: ON_CHANGE_SIGN_UP_INFORMATION,
  payload,
});

export const setLoading = (payload) => ({ payload, type: ON_CHANGE_LOADING });

export const setStepValue = (payload) => ({
  payload,
  type: ON_CHANGE_STEP_VALUE,
});
