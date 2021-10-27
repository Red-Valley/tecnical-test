import {
  LOADING_USERROOM,
  LOADING_MESSAGESROOM,
  SET_LEAVEROOM,
  CLEAR_USERSROOM,
  CLEAR_MESSAGESROOM,
} from "../types";

const initialState = {
  messages: [],
  users: [],
};

const actions = function (state = initialState, action: any) {
  switch (action.type) {
    case LOADING_MESSAGESROOM:
      return {
        ...state,
        messages: action.payload,
      };
    case LOADING_USERROOM:
      return {
        ...state,
        users: action.payload,
      };
    case CLEAR_USERSROOM:
      return {
        ...state,
        users: [],
      };
    case CLEAR_MESSAGESROOM:
      return {
        ...state,
        messages: [],
      };
    case SET_LEAVEROOM:
      return initialState;
    default:
      return state;
  }
};

export default actions;
