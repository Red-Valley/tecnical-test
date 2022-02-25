import { TYPES } from '../../types';

export const userReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_CURRENT_USER:
      console.log("🚀 ~ file: user.reducer.js ~ line 9 ~ userReducer ~ action.payload", action.payload.isAuthenticated)
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        followers: action.payload.followers,
      };
    case TYPES.UPDATE_FOLLOWERS: 
    return {
      ...state,
      followers: action.payload.followers,
    }
    default:
      return state;
  }
};
