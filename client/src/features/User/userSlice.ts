import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserEntity } from "../../entities/user.entity";
import { RootState } from "../../store/store";
import axios from "axios";

const API_URL = "http://localhost/api";

export enum UserStateStatuses {
  idle,
  login,
  online,
  connecting,
  failed,
  disconnecting,
}

export interface UserState {
  currentUser: UserEntity | null;
  status: UserStateStatuses;
  error: string | null | undefined;
}
const initialState: UserState = {
  currentUser: null,
  status: UserStateStatuses.idle,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login:(state,action)=>{
      if (action.payload) {
        state.status = UserStateStatuses.connecting;
        state.currentUser = action.payload;
      } else {
        state.status = UserStateStatuses.failed;
        state.currentUser = null;
      }
    },
    logged: (state, action) => {
      state.status = UserStateStatuses.online;
      state.currentUser = action.payload;
    },
    failed: (state,action) =>{
      state.status = UserStateStatuses.failed;
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.status = UserStateStatuses.idle;
      state.currentUser = null;
    },
   },
});

export function tryLogin(user: any) {
  return async function tryLoginThunk(dispatch: any, getState: any) {
    try {
           
      dispatch(login(user));
      const response: any = await axios.post(`${API_URL}/users/login`, user).then();
      if (response.data) {
        dispatch(logged(response.data));
        return response.data;
      }
      dispatch(failed('nickname or passwrod incorrect'));      
    } catch (error) {
      dispatch(failed(error));
    }
  };
}

export const {login, failed, logged, logout } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
