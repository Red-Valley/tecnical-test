import { SafetyDivider } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MessageEntity } from "../../entities/message.entity";
import { RootState } from "../../store/store";

export interface ChatState {
  userName: string | null;
  messages: MessageEntity[];
  status:
    | "idle"
    | "connecting"
    | "connected"
    | "disconnected"
    | "disconnecting"

  error: null;
}
const initialState: ChatState = {
  userName: null,
  messages: [],
  status: "idle",
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    login:(state,action)=>{
      state.status = "connecting";
      state.userName = action.payload;      
    },
    logout:(state,action)=>{
      state.status = "disconnecting";
    },
    userJoined: (state, action) => {    
      state.status = "connected";
      state.messages = state.messages.concat(action.payload);
    },
    userLeft: (state, action) => {
      state.status = 'disconnected';
      state.userName = null;
    },
    messageReceived: (state, action) => {
      state.messages = state.messages.concat(action.payload);
    },sendMessage:(state, action)=>{    
    
    },  
    messageSent: (state, action) => {
      
    },
  },
});

export const { login,logout, userJoined, messageReceived, messageSent,sendMessage, userLeft } =
  chatSlice.actions;

export const selectAllOrderedMessages = (state: RootState) =>
  state.chat.messages.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).reverse();;
export const selectUserName = (state: RootState) => state.chat.userName;

export default chatSlice.reducer;
