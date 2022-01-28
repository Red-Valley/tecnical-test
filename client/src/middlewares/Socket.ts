import * as io from "socket.io-client";
import { MessageEntity } from "../entities/message.entity";

export const EVENTS = {
  CONNECT: "connect",
  JOINED_ROOM: "joinedRoom",
  DISCONNECT: "disconnect",
  MESSAGES: "messages",
  USERS: "users",
  LEFT_ROOM: "leftRoom",
  MESSAGE_SENT: "messageSent",
};

export default class SocketInterface {
  public user: string;
  public port: string;
  private onChange: (isConnected: boolean) => void;
  private onMessage: (message: MessageEntity) => void;
  private onJoinedRoom: (message: MessageEntity[]) => void;
  private socket: any;

  constructor(

    onChange: (isConnected: boolean) => void,
    onMessage: (message: MessageEntity) => void,
    onJoinedRoom: (messages: MessageEntity[]) => void
  ) {
    this.onChange = onChange;
    this.onJoinedRoom = onJoinedRoom;
    this.onMessage = onMessage;
 

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
    this.socket.on(EVENTS.USERS, this.onMessage);  
  }

  public onConnected = () => {
    this.onChange(true);
  };

  public onDisconnected = () => {  
      this.onChange(false);
  };

  public joinedRoom = (userName:string) => {
    if (typeof this.socket.emit === "function") {
      this.socket.emit(EVENTS.JOINED_ROOM, userName, this.onJoinedRoom);

    } else {
      console.error(`Cannot emit socket event:${EVENTS.MESSAGE_SENT}. Socket.io not connected.`);
    }
  };

  public messageSent = (msg:MessageEntity) => {
    if (typeof this.socket.emit === "function") {
      this.socket.emit(EVENTS.MESSAGE_SENT, msg);
    } else {
      console.error(`Cannot emit socket event:${EVENTS.MESSAGE_SENT}. Socket.io not connected.`);
    }
  };

  public disconnect = (userName:string) =>{ 
  
    if (typeof this.socket.emit === "function") {
        this.socket.close(this.onDisconnected);
    } else {
      console.error(`Cannot emit socket event:${EVENTS.LEFT_ROOM}. Socket.io not connected.`);
    }

    
  
  }
}
