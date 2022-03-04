import { call, put, take, fork, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { BASE_API, BASE_URL, SOCKET_EVENTS } from "utils/constants";
import {
  chatRoomActionTypes,
  listMessagesFailure,
  listMessagesSuccess,
  receiveMessage
} from "actions/chatRoomActions";
import io from "socket.io-client";
import { eventChannel } from "redux-saga";

const listMessages = ({ page, limit }: BasePagination): any => {
  let queryString = '?';
  if(typeof page === "number") { queryString += `page=${page}&` }
  if(limit) { queryString += `limit=${limit}` }
  return axios.get<IMessage[]>(`${BASE_API}/message/${queryString}`);
}

const connect = (): any => {
  const socket = io(BASE_URL as string);
  return new Promise((resolve) => {
    socket.on(SOCKET_EVENTS.CONNECTION, () => {
      // join to default room on connect
      socket.emit(SOCKET_EVENTS.JOIN_TO_ROOM);
      resolve(socket);
    });
  });
};

function* read(socket: any): any {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function subscribe(socket: any): any {
  return eventChannel((emit) => {
    const update = (message: IMessage) => {
      console.log("new message", message);
      return emit(receiveMessage(message));
    };
    console.log("socket listening on get messages");
    socket.on(SOCKET_EVENTS.RECEIVE_ROOM_MESSAGES, update);
    return () => {
      // socket.off();
    };
  });
}

function* write(socket: any) {
  while (true) {
    const { payload } = yield take(chatRoomActionTypes.SEND_MESSAGE);
    socket.emit(SOCKET_EVENTS.SEND_ROOM_MESSAGE, payload);
  }
}

export function* listMessagesSaga({ payload }: IListMessagesAction): any {
  try {
    const response = yield call(listMessages, payload);
    yield put(listMessagesSuccess(response.data));
  } catch (error) {
    yield put(listMessagesFailure({ error: true }));
  }
}

export default function* chatRoomSaga(): any {
  yield takeLatest(chatRoomActionTypes.LIST_MESSAGES_REQUEST, listMessagesSaga);
  const socket = yield call(connect);
  yield fork(read, socket);
  yield fork(write, socket);
}
