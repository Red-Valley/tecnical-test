import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import axios from "axios";

const API_URL = "http://localhost/api";

export enum SignInStateStatuses {
  idle,
  registering,
  sigIn, 
  failed,

}

export interface SignInState {
  isNickNameAvailable: boolean;  
  nickName:string,
  status: SignInStateStatuses;
  error: string | null | undefined;
}
const initialState: SignInState = {
  isNickNameAvailable: false,
  nickName:'',
  status: SignInStateStatuses.idle,
  error: null,
};

const signInSlice = createSlice({
  name: "signIn",  
  initialState,
  reducers: {
   failed: (state,action) =>{
      state.status = SignInStateStatuses.failed;
      state.error = action.payload;
    },
  setNickName:(state, action)=>{
    state.nickName=action.payload.nickName;
    state.isNickNameAvailable=action.payload.available;
  }

  }
});
 
export function isNickNameAvailable(nickName: string) {
  return async function isNickNameAvailableLoginThunk(dispatch: any, getState: any) {
    try {
      
      const response:any = await axios
      .get(`${API_URL}/users/isNickNameValid/` + nickName)
      .then();
      if (response.data) {
        dispatch(setNickName({nickName:nickName, available: true}));
        return response.data;
      }
      dispatch(setNickName({nickName:nickName, available: false}));
    } catch (error) {
      dispatch(failed(error));
    }
  };
}

export const signIn = createAsyncThunk("user/sigIn", async (user: any) => {
  const response = await axios.post(`${API_URL}/users/create`, user).then();
  return response.data;
});

export const {setNickName,failed } = signInSlice.actions;

export const selectIsAvailableNickName = (state: RootState) => state.sigIn.isNickNameAvailable;

export default signInSlice.reducer;
