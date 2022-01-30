import * as io from "socket.io-client";
import { MessageEntity } from "../entities/message.entity";

export const EVENTS = {
  CONNECT: "connect",
  JOINED_ROOM: "joinedRoom",
  DISCONNECT: "disconnect",
  MESSAGES: "messages",
  USER_JOINED: "userJoined",
  USER_LEFT: "userLeft",
  LEFT_ROOM: "leftRoom",
  MESSAGE_SENT: "messageSent",
};

export default class SocketInterface {
  public user: string;
  public port: string;
  private onChange: (isConnected: boolean) => void;
  private onMessage: (message: MessageEntity) => void;
  private onUserJoined: (user: any) => void;
  private onUserLeft: (nickName: string) => void;
  private onJoinedRoom: (message: MessageEntity[]) => void;
  private socket: any;

  constructor(

    onChange: (isConnected: boolean) => void,
    onMessage: (message: MessageEntity) => void,
    onJoinedRoom: (messages: MessageEntity[]) => void,
    onUserJoined: (user: any) => void,
    onUserLeft: (nickName: string) => void
  ) {
    this.onChange = onChange;
    this.onJoinedRoom = onJoinedRoom;
    this.onMessage = onMessage;
    this.onUserJoined = onUserJoined;
    this.onUserLeft = onUserLeft;
 

    this.socket = "";
    this.user = "";
    this.port = "";
  }

  public connect = (user: string, port: string) => {
    this.user = user;
    this.port = port;
    const host = `http://localhost:${port}`; 
     this.socket = io.connect(host);
    //this.socket = io.connect(); 
    this.socket.on(EVENTS.CONNECT, this.onConnected);
  };
  
  public listenMessages =()=>{  
    this.socket.on(EVENTS.MESSAGES, this.onMessage);  
  }
  public listenUserLeft =()=>{  
    this.socket.on(EVENTS.USER_LEFT, this.onUserLeft);  
  }
  public listenUserJoined =()=>{  
    this.socket.on(EVENTS.USER_JOINED, this.onUserJoined);  
  }

  public onConnected = () => {
    this.onChange(true);
  };

  public onDisconnected = () => {  
      this.onChange(false);
  };

  public joinedRoom = (nickName:string) => {
    if (typeof this.socket.emit === "function") {
      this.socket.emit(EVENTS.JOINED_ROOM, nickName, this.onJoinedRoom);

    } else {
      console.error(`Cannot emit socket event:${EVENTS.JOINED_ROOM}. Socket.io not connected.`);
    }
  };

  public leftRoom = (nickName:string) => {
    if (typeof this.socket.emit === "function") {
      this.socket.emit(EVENTS.LEFT_ROOM, nickName);

    } else {
      console.error(`Cannot emit socket event:${EVENTS.LEFT_ROOM}. Socket.io not connected.`);
    }
  };

  public messageSent = (msg:MessageEntity) => {
    if (typeof this.socket.emit === "function") {
      this.socket.emit(EVENTS.MESSAGE_SENT, msg);
    } else {
      console.error(`Cannot emit socket event:${EVENTS.MESSAGE_SENT}. Socket.io not connected.`);
    }
  };

  public disconnect = () =>{ 
  
    if (typeof this.socket.emit === "function") {
        this.socket.close(this.onDisconnected);
    } else {
      console.error(`Cannot emit socket event:${EVENTS.DISCONNECT}. Socket.io not connected.`);
    }   
  
  }
}
