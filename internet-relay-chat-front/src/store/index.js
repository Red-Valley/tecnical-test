import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import RootReducer from "../rootReducer";

const store = createStore(RootReducer, applyMiddleware(reduxThunk));
export default store;
