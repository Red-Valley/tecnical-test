import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import axios from "axios";
import { logged, loading } from "../Chat/userSlice";

const API_URL = "http://localhost/api";

export enum LoginStateStatuses {
  idle,
  loading,
  success, 
  failed
}

export interface LoginState {
  isLoginValid: boolean;    
  status: LoginStateStatuses;
  error: string | null | undefined;
}
const initialState: LoginState = {
  isLoginValid: false,  
  status: LoginStateStatuses.idle,
  error: null,
};

const loginSlice = createSlice({
  name: "login",  
  initialState,
  reducers: {
   loginFailed: (state,action) =>{
      state.status = LoginStateStatuses.failed;
      state.error = action.payload;
    },
  loginSuccess:(state, action)=>{
    state.status = LoginStateStatuses.success;
    state.isLoginValid=true;
  },
  loginInit:(state, action)=>{
    state.status = LoginStateStatuses.idle;
    state.isLoginValid=false;
  }

  }
});

export function tryLogin(user: any) {
    return async function tryLoginThunk(dispatch: any, getState: any) {
      try {
             
        
        const response: any = await axios.post(`${API_URL}/users/login`, user).then();
        if (response.data) {
          dispatch(loading(response.data));
         dispatch(loginSuccess(response.data));
          dispatch(logged(response.data));
          return response.data;
        }
        dispatch(loginFailed('nickname or passwrod incorrect'));      
      } catch (error) {
        dispatch(loginFailed(error));
      }
    };
  }
 



export const {loginInit,loginSuccess,loginFailed} = loginSlice.actions;

export const selectIsLoginValid = (state: RootState) => state.login.isLoginValid;
export const selectLoginStatus = (state: RootState) => state.login.status;

export default loginSlice.reducer;
