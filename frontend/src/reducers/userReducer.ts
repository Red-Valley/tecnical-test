import { userActionTypes } from "actions/userActions";

const initialState: UserState = {
  pending: false,
  user: undefined,
  error: false,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case userActionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        error: false,
        pending: true,
      };
    case userActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        error: false,
        user: action.payload,
        pending: false,
      };
    case userActionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        error: true,
        user: undefined,
        pending: false,
      };

    case userActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        error: false,
        pending: true,
      };
    case userActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        pending: false,
        error: false,
      };
    case userActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        error: true,
        user: undefined,
        pending: false,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
