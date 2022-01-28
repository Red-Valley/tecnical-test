import { createSlice } from "@reduxjs/toolkit";

export interface SocketInitialState {
  connected: boolean;
  isError: boolean;
  status: "idle" | "connecting" | "connected" | "failed" |  "disconnecting" |"disconnected";
  port: string;
}

const initialState: SocketInitialState = {
  connected: false,
  isError: false,
  status: "idle",
  port: "3000",
};

const socketSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    connecting(state, action) {
      state.status = "connecting";
    },
    connected(state, action) {
      state.status = "connected";
    },
    disconnecting(state, action){
      state.status = "disconnecting"
    },
    disconnected(state, action) {
      state.status = "disconnected";
      state.isError = false;
    },
    failed(state, action) {
      state.status = "failed";
      state.isError = true;
    },
  },
});

export const { connecting, connected, disconnected, failed, disconnecting } =
  socketSlice.actions;

export default socketSlice.reducer;
