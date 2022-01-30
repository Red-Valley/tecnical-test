import {
  createStore,
  ThunkAction,
  applyMiddleware,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice";
import chatReducer from "../features/Chat/chatSlice";
import textBoxMessageReducer from "../features/Chat/textBoxMessageSlice";
import socketMiddleware from "../middlewares/socketMiddleware";

const rootReducer = combineReducers({
  user: userReducer,  
  chat: chatReducer,  
  textBoxMessage: textBoxMessageReducer,
  
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
