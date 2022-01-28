import {
  createStore,
  ThunkAction,
  applyMiddleware,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import chatReducer from "../features/Chat/chatSlice";
import textBoxMessageReducer from "../features/Chat/textBoxMessageSlice";
import socketReducer from "../features/Socket/socketSlice";
import socketMiddleware from "../middlewares/socketMiddleware";

const rootReducer = combineReducers({
  chat: chatReducer,  
  textBoxMessage: textBoxMessageReducer,
  socket: socketReducer,
  
});


export const store = createStore(
  rootReducer,
  applyMiddleware(socketMiddleware)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
