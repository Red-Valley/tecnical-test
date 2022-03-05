import { userActionTypes } from "actions/userActions";
import { STORED_TOKEN_KEY } from "utils/constants";

const initialState: UserState = {
  gettingProfile: false,
  pending: false,
  user: undefined,
  error: false,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case userActionTypes.SIGNIN_REQUEST:
    case userActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        error: false,
        pending: true,
      };
    case userActionTypes.SIGNIN_SUCCESS:
    case userActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        error: false,
        user: action.payload,
        pending: false,
      };
    case userActionTypes.SIGNIN_FAILURE:
    case userActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        error: true,
        user: undefined,
        pending: false,
      };

    case userActionTypes.PROFILE_REQUEST:
      return {
        ...state,
        error: false,
        gettingProfile: true,
      };
    case userActionTypes.PROFILE_SUCCESS:
      return {
        ...state,
        error: false,
        user: action.payload,
        gettingProfile: false,
      };
    case userActionTypes.PROFILE_FAILURE:
      return {
        ...state,
        error: true,
        user: undefined,
        gettingProfile: false,
      };

    case userActionTypes.LOGOUT:
      localStorage.removeItem(STORED_TOKEN_KEY);
      return initialState;

    default:
      return { ...state };
  }
};

export default userReducer;
