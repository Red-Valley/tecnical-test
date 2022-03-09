import { combineReducers } from "redux"
import messages from './messages.reducer';
import users from './users.reducer';

const chat = combineReducers({
    messages,
    users
});

export default chat;