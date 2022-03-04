import { combineReducers } from "redux";
import chatRoomReducer from "./chatRoomReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    chatRoom: chatRoomReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;