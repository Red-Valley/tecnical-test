import axios from "axios";

import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
} from "../types";

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/users/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: (err.response && err.response.data.code) || err.message,
      });
    });
};

export const signupUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/users/signup", userData)
    .then((res) => {
      setAuthorizationHeader(res.data);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: (err.response && err.response.data.code) || err.message,
      });
    });
};

export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch: any) => {
  axios
    .get("/users")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: { credentials: res.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: (err.response && err.response.data.code) || err.message,
      });
    });
};

const setAuthorizationHeader = (token: any) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
