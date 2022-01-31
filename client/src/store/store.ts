import {
  createStore,
  ThunkAction,
  applyMiddleware,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import loginReducer from "../features/Home/loginSlice";
import signInReducer from "../features/Home/signInSlice";
import userReducer from "../features/Chat/userSlice";
import chatReducer from "../features/Chat/chatSlice";
import textBoxMessageReducer from "../features/Chat/textBoxMessageSlice";
import socketMiddleware from "../middlewares/socketMiddleware";
import giphySearchSlice from "../features/Chat/giphySearchSlice";

const rootReducer = combineReducers({
  login:loginReducer,
  sigIn: signInReducer,  
  user: userReducer,  
  chat: chatReducer,  
  textBoxMessage: textBoxMessageReducer,
  giphySearch: giphySearchSlice,
  
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
