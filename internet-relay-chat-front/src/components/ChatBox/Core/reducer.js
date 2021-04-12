import { SET_MESSAGE_INTO_CHAT, SET_MESSAGE_HISTORY } from "./actions";
const initialState = {
  messages: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MESSAGE_INTO_CHAT:
      return { ...state, messages: [...state.messages, { ...payload }] };

    case SET_MESSAGE_HISTORY:
      return { ...state, messages: payload };

    default:
      return state;
  }
};
