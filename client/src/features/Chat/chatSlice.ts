import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MessageEntity } from "../../entities/message.entity";
import { UserEntity } from "../../entities/user.entity";
import { RootState } from "../../store/store";
import axios from "axios";

const API_URL = "http://localhost/api";

const newMessageSound=()=>{
  let url = "assets/sounds/beep_sms.mp3";
  let audio = new Audio(url);       
  audio.play();
}

export enum ChatStateStatuses{
      idle,
     connecting,
     connected,
     loading, 
     joined,
     disconnected,
     disconnecting,
     failed
}

export interface ChatState {
  users: UserEntity[];
  messages: MessageEntity[];
  status:ChatStateStatuses    

  error: null;
}
const initialState: ChatState = {
  users: [],
  messages: [],
  status: ChatStateStatuses.idle,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    connecting(state, action) {
      state.status = ChatStateStatuses.connecting;
    },
    connected:(state, action)=>{
      state.status = ChatStateStatuses.loading;            
    },
    loadHistory:(state, action)=>{             
      state.status = ChatStateStatuses.connected;           
      state.messages = action.payload;
    },
    loadUsers:(state, action)=>{             
      state.users = action.payload;
    },
    userJoined: (state, action) => {    
      let userIndex= state.users.findIndex(x=>x.nickName==action.payload.nickName);
      if(userIndex==-1)
      {
        state.users.push(action.payload);            
      }      
    },
    joined: (state, action) => {      
      state.status = ChatStateStatuses.joined;
      let userIndex= state.users.findIndex(x=>x.nickName==action.payload.nickName);
      if(userIndex==-1)
      {
        state.users.push(action.payload);            
      }      
    },
    disconnecting(state, action){
      state.status = ChatStateStatuses.disconnecting;
    },
    userLeft: (state, action) => {   
      let userIndex= state.users.findIndex(x=>x.nickName==action.payload);
      if (state.users.length==1)
      {
          state.users = [];
      }else{
        state.users.splice(userIndex,1);
      }            
    },
    messageReceived: (state, action) => {
      let found = state.messages.find(x=>x.id==action.payload.id);
      if(!found)
      {
      state.messages = state.messages.concat(action.payload).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).reverse();
     
      newMessageSound();

      }
    }, 
    disconnected: (state, action) => {
      state.status = ChatStateStatuses.disconnected;
    }, 
       

  },

});


   export function fetchConnectedUsers() {
      return async function fetchConnectedUsersThunk(dispatch: any, getState: any) {
        try {

    const response = await axios
      .get(`${API_URL}/users/status/connected`)
      .then();
      if (response.data) {
        dispatch(loadUsers(response.data));
        return response.data;
      }   
  } catch (error) {

  }
};
}

export const { connected,connecting, loadHistory,loadUsers,joined, userJoined, messageReceived,disconnecting, userLeft, disconnected } =
  chatSlice.actions;

export const selectAllOrderedMessages = (state: RootState) =>
  state.chat.messages.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).reverse();
export const selectAvatarByUserName = (state: RootState, nickName:string) => state.chat.users.find(x=>x.nickName==nickName)?.avatar;
export const selectCurrentChatStatus = (state:RootState) => state.chat.status;

export const selectCurrentTotalUsers = (state:RootState) => state.chat.users.length;

export default chatSlice.reducer;
