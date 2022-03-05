export enum chatRoomActionTypes {
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",

  CONNECT_TO_ROOM = "CONNECT_TO_ROOM",
  DISCONECT_ROOM = "DISCONECT_ROOM",

  LIST_MESSAGES_REQUEST = "LIST_MESSAGES_REQUEST",
  LIST_MESSAGES_SUCCESS = "LIST_MESSAGES_SUCCESS",
  LIST_MESSAGES_FAILURE = "LIST_MESSAGES_FAILURE",

  SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST",
  SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS",
  SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE",

  GET_MESSAGES = "GET_MESSAGES",
  SEND_MESSAGE = "SEND_MESSAGE",
  RECEIVE_MESSAGE = "RECEIVE_MESSAGE",
}

export const setCurrentMessagesPage = (page = 0) => ({
  type: chatRoomActionTypes.SET_CURRENT_PAGE,
  payload: { page },
});

export const connectoRoomAction = (token: string) => ({
  type: chatRoomActionTypes.CONNECT_TO_ROOM,
  payload: { token },
});
export const disconnecRoomAction = () => ({
  type: chatRoomActionTypes.DISCONECT_ROOM
});

export const listMessagesRequest = (payload: IListMessagesRequest) => ({
  type: chatRoomActionTypes.LIST_MESSAGES_REQUEST,
  payload,
});
export const listMessagesSuccess = (payload: IMessage[]) => ({
  type: chatRoomActionTypes.LIST_MESSAGES_SUCCESS,
  payload,
});
export const listMessagesFailure = (payload: any) => ({
  type: chatRoomActionTypes.LIST_MESSAGES_FAILURE,
  payload,
});

export const sendMessageRequest = (payload: ISendMessage) => ({
  type: chatRoomActionTypes.SEND_MESSAGE_REQUEST,
  payload,
});
export const sendMessageSuccess = (payload: IMessage) => ({
  type: chatRoomActionTypes.SEND_MESSAGE_SUCCESS,
  payload,
});
export const sendMessageFailure = (payload: any) => ({
  type: chatRoomActionTypes.SEND_MESSAGE_FAILURE,
  payload,
});

export const sendMessage = (payload: ISendMessage) => ({
  type: chatRoomActionTypes.SEND_MESSAGE,
  payload,
});

export const receiveMessage = (payload: IMessage) => ({
  type: chatRoomActionTypes.RECEIVE_MESSAGE,
  payload,
});
