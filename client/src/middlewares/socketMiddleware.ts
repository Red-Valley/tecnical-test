import {
  connected,
  disconnected,
  connecting,
  userJoined,
  userLeft,
  messageReceived,
  loadHistory,
  joined,
} from "../features/Chat/chatSlice";
import { MessageEntity } from "../entities/message.entity";
import SocketInterface from "./Socket";
import { logout } from "../features/Chat/userSlice";
import { loginInit } from "../features/Home/loginSlice";
import { messageSent } from "../features/Chat/textBoxMessageSlice";

const socketMiddleware = (store: any) => {
  const onConnectionChange = (isConnected: boolean) => {
     if (!isConnected) {
      store.dispatch(disconnected(isConnected));
    } else {
      store.dispatch(connecting(isConnected));
    }
  };

  const onMessage = (message: MessageEntity) =>
    store.dispatch(messageReceived(message));

    const onUserJoined = (user: any) =>
    store.dispatch(userJoined(user));

    const onUserLeft = (nickName: string) =>
    store.dispatch(userLeft(nickName));
    
  const onJoinedRoom = (messages: MessageEntity[]) => {
    
    store.dispatch(loadHistory(messages));
    store.dispatch(connected(true)); 
    const userState = store.getState().user;
    store.dispatch(joined(userState.currentUser)); 
  };

  const socket = new SocketInterface(
    onConnectionChange,
    onMessage,
    onJoinedRoom,
    onUserJoined,
    onUserLeft
  );

  return (next: any) => (action: any) => {
  
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
          socket.listenUserJoined();
          socket.listenUserLeft();
          socket.joinedRoom(userState.currentUser.nickName);
          break;           
          case "user/logout":
            socket.leftRoom(userState.currentUser.nickName);
            store.dispatch(disconnected(false));
          break;
        case "chat/disconnecting":
          store.dispatch(userLeft(userState.currentUser.nickName));
          store.dispatch(logout(true));  
          store.dispatch(loginInit(true));
          break;
        case "textBoxMessage/sendMessage":
          socket.messageSent(action.payload);
          store.dispatch(messageSent(action.payload));
          break;
      }
    }

    return next(action);
  };
};

export default socketMiddleware;
