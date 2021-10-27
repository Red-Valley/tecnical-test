import { SET_USER, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
};

const actions = function (state = initialState, action: any) {
  switch (action.type) {
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default actions;
