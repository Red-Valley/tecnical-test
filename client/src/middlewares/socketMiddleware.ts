import {
  connected,
  disconnected,
  connecting,
  userJoined,
  userLeft,
  messageReceived,
  disconnecting,
  loadHistory,
} from "../features/Chat/chatSlice";
import { MessageEntity } from "../entities/message.entity";
import SocketInterface from "./Socket";

const socketMiddleware = (store: any) => {
  const onConnectionChange = (isConnected: boolean) => {
    console.log("La conexion se: ", isConnected);
    if (!isConnected) {
      store.dispatch(disconnected(isConnected));
    } else {
      store.dispatch(connecting(isConnected));
    }
  };

  const onMessage = (message: MessageEntity) =>
    store.dispatch(messageReceived(message));

  const onJoinedRoom = (messages: MessageEntity[]) => {
    
    store.dispatch(loadHistory(messages));
    store.dispatch(connected(true)); 
    const userState = store.getState().user;
    store.dispatch(userJoined(userState.currentUser)); 
  };

  const socket = new SocketInterface(
    onConnectionChange,
    onMessage,
    onJoinedRoom
  );

  return (next: any) => (action: any) => {
    console.log(action);
    if (typeof action === "function") {
      return action(store.dispatch, store.getState);
    } else {
       const userState = store.getState().user;
      switch (action.type) {
        case "user/logged":
          socket.connect("", "80");
          break;
        case "chat/connecting":
          socket.listenMessages();
          socket.joinedRoom(userState.currentUser.nickName);
          break;           
          case "user/logout":
          store.dispatch(disconnecting(false));
          break;
        case "chat/disconnecting":
          store.dispatch(userLeft(userState.currentUser.nickName));
          break;
        case "chat/userLeft":
          socket.disconnect(userState.currentUser.nickName);
          break;
        case "chat/disconnected":
          store.dispatch(disconnected(false));
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
