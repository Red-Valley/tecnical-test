import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import chatReducer from "./reducers/chatReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

const middlerware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  chat: chatReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middlerware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
