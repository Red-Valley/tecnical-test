import { combineReducers } from "redux";
import LoginReducer from "./components/Login/Core/reducer";
import MessageMakerReducer from "./components/Chat/Core/reducer";
import MessagesReducer from "./components/ChatBox/Core/reducer";

export default combineReducers({
  login: LoginReducer,
  messageMaker: MessageMakerReducer,
  messages: MessagesReducer,
});
