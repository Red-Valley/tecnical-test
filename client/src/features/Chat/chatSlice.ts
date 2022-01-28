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
    | "notConnected"
    | "failed"
    | "loading"
    | "succeeded";
  error: null;
}
const initialState: ChatState = {
  userName: "pipemessi8",
  messages: [],
  status: "idle",
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    userJoined: (state, action) => {    
      state.messages = state.messages.concat(action.payload);
    },
    userLeft: (state, action) => {
      state.userName = null;
    },
    messageReceived: (state, action) => {
      state.messages = state.messages.concat(action.payload);
    },
    messageSent: (state, action) => {},
  },
});

export const { userJoined, messageReceived, messageSent, userLeft } =
  chatSlice.actions;

export const selectAllOrderedMessages = (state: RootState) =>
  state.chat.messages;
export const selectUserName = (state: RootState) => state.chat.userName;

export default chatSlice.reducer;
