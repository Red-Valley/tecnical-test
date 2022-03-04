import { all, fork } from "redux-saga/effects";
import chatRoomSaga from "./chatRoomSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(chatRoomSaga)]);
}
