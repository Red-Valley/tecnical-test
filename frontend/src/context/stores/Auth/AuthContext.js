import React, { createContext, useReducer, useEffect } from 'react';
import { TYPES } from '../../../types';
import { userReducer } from '../../reducers/user.reducer';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    user: {},
    isLoading: false,
    followers: [],
  });



  return (
    <AuthContext.Provider value={{ userState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
