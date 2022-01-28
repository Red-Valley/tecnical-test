import Socket, { EVENTS } from "./Socket";
import {
  userJoined,
  userLeft,
  messageReceived,
  messageSent,
} from "../../Chat/chatSlice";
import { connected, disconnected } from "../socketSlice";
import { MessageEntity } from "../../../entities/message.entity";
const socketMiddleware = (store: any) => {
  const onConnectionChange = (isConnected: boolean) => {
    if (!isConnected) {
      store.dispatch(disconnected(isConnected));
    }{
    store.dispatch(connected(isConnected));
    }
  };

  const onMessage = (message: MessageEntity) =>
    store.dispatch(messageReceived(message));
  const onJoinedRoom = (messages: MessageEntity[]) => {
    console.log('Joined Room',messages);
    store.dispatch(userJoined(messages));
  };

  const socket = new Socket(onConnectionChange, onMessage, onJoinedRoom);

  return (next: any) => (action: any) => {
    const chatState = store.getState().chat;
    const socketState = store.getState().socket;
    console.log(action.type)
    switch (action.type) {
      case "chat/connecting":
        socket.connect("", "3000");
        break;
      case "chat/connected":
        socket.joinedRoom(chatState.userName);
        break;
      case "chat/disconnecting":
        socket.disconnect(chatState.userName);
        break;
      case "chat/disconnected":
        store.dispatch(userLeft(chatState.userName));
        break;
      case "chat/messageSent":
        socket.messageSent(action.payload.message);
        store.dispatch(messageSent(action.payload));
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
