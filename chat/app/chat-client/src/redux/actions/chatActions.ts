import { ref, set, push, remove, onValue } from "firebase/database";

import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  LOADING_MESSAGESROOM,
  LOADING_USERROOM,
  SET_LEAVEROOM,
  CLEAR_USERSROOM,
  CLEAR_MESSAGESROOM,
} from "../types";

import dataDase from "../../Firebase";

export const sendMessage = (message: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  set(push(ref(dataDase, "messages/")), message)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: (err.response && err.response.data.code) || err.message,
      });
    });
};

export const onAddedMessages = () => (dispatch: any) => {
  onValue(ref(dataDase, "messages/"), (snapshot) => {
    const data = Object.entries(snapshot.val() || {}).map((e) =>
      Object.assign(e[1], { key: e[0] })
    );
    dispatch({ type: CLEAR_MESSAGESROOM });
    dispatch({
      type: LOADING_MESSAGESROOM,
      payload: data,
    });
  });
};

export const connectUserRoom = (user: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  set(push(ref(dataDase, "roomusers/")), user)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: (err.response && err.response.data.code) || err.message,
      });
    });
};

export const disconnectUserRoom = (key: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  remove(ref(dataDase, `roomusers/${key}`))
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_LEAVEROOM });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: (err.response && err.response.data.code) || err.message,
      });
    });
};

export const onAddedUserRoom = () => (dispatch: any) => {
  onValue(ref(dataDase, "roomusers/"), (snapshot) => {
    const data = Object.entries(snapshot.val() || {}).map((e) =>
      Object.assign(e[1], { key: e[0] })
    );
    dispatch({ type: CLEAR_USERSROOM });
    dispatch({
      type: LOADING_USERROOM,
      payload: data,
    });
  });
};