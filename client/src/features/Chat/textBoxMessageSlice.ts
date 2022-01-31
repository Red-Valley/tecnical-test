import { createSlice } from "@reduxjs/toolkit";
import { MessageEntity } from "../../entities/message.entity";
import { RootState } from "../../store/store";



export enum TextBoxStateStatuses{
idde,
loading,
sending,
error,
failed,
}

export interface TextBoxState {
  message: string;
  status: TextBoxStateStatuses;
  error: null;
}
const initialState:TextBoxState = {
  message: "",
  status: TextBoxStateStatuses.idde,
  error: null,
};

const textBoxMessageSlice = createSlice({
  name: "textBoxMessage",  
  initialState,
  reducers: {     
    messageSent(state, payload){
      state.status = TextBoxStateStatuses.idde;
    },
    sendMessage(state, payload){
      state.status = TextBoxStateStatuses.loading;
    },
    textBoxLoading(state, payload)
    {
      state.status = TextBoxStateStatuses.loading;
    }

  }
});


export function buildMessage(text:any) {
  return async function buildMessageThunk(dispatch:any, getState:any) {
    const state = getState().user;
    let message:MessageEntity = {id:null,body:text, nickName:state.currentUser.nickName, createdAt:new Date().toJSON()} ;
    dispatch(sendMessage(message))
  }
}


export const {sendMessage, messageSent, textBoxLoading} = textBoxMessageSlice.actions;

export const selectTextBoxMessageStatus = (state: RootState) => state.textBoxMessage.status;

export default textBoxMessageSlice.reducer;


