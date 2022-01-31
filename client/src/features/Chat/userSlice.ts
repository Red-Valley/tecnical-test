import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserEntity } from "../../entities/user.entity";
import { RootState } from "../../store/store";
import axios from "axios";

const API_URL = "http://localhost/api";

export enum UserStateStatuses {
  idle, 
  online,
  connecting,
  offline,
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
    loading:(state,action)=>{
            state.status = UserStateStatuses.connecting;       
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



export const {loading, failed, logged, logout } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
