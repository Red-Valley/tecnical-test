import { DEFAULT_MESSAGE, ON_WRITE_MESSAGE, CLEAN_MESSAGE } from "./actions";

const initialState = {
  message: DEFAULT_MESSAGE,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ON_WRITE_MESSAGE:
      return { ...state, message: payload };

    case CLEAN_MESSAGE:
      return { ...state, message: DEFAULT_MESSAGE};

    default:
      return state;
  }
};
