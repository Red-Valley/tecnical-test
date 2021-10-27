import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

const initialState = {
  loading: false,
  errors: "",
};

const actions = function (state = initialState, action: any) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: "",
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default actions;
