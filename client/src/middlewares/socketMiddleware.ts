import {
  userJoined,
  userLeft,
  messageReceived,
} from "../features/Chat/chatSlice";
import { connected, disconnected } from "../features/Socket/socketSlice";
import { MessageEntity } from "../entities/message.entity";
import SocketInterface from "./Socket";
const socketMiddleware = (store: any) => {
  const onConnectionChange = (isConnected: boolean) => {
    if (!isConnected) {
      store.dispatch(disconnected(isConnected));
    } else {
      store.dispatch(connected(isConnected));
    }
  };

  const onMessage = (message: MessageEntity) =>
    store.dispatch(messageReceived(message));
  const onJoinedRoom = (messages: MessageEntity[]) => {
    store.dispatch(userJoined(messages));
  };

  const socket = new SocketInterface(
    onConnectionChange,
    onMessage,
    onJoinedRoom
  );

  return (next: any) => (action: any) => {
    if (typeof action === "function") {
      return action(store.dispatch, store.getState);
    } else {
      const chatState = store.getState().chat;
      switch (action.type) {
        case "chat/connecting":
          socket.connect("", "3000");
          break;
        case "chat/connected":
          socket.listenMessages();
          socket.joinedRoom(chatState.userName);
          break;
        case "chat/logout":
          socket.disconnect(chatState.userName);
          break;
        case "chat/userLeft":
          socket.disconnect(chatState.userName);
          break;
        case "chat/disconnecting":
          store.dispatch(userLeft(chatState.userName));
          break;
        case "textBoxMessage/sendMessage":
          socket.messageSent(action.payload);
          break;
      }
    }

    return next(action);
  };
};

export default socketMiddleware;
