import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { MessageEntity } from '../entities/Message.entity';
import { MessagesService } from '../services/messages/messages.service';
import { UsersService } from '../services/users/users.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatSocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private usersService: UsersService,private messagesService: MessagesService) { }

  @SubscribeMessage('joinedRoom')
  async handleJoinRoom(client: any, payload: string): Promise<MessageEntity[]> {  

    let user = await this.usersService.getUserByUserName(payload).then();

    if (user)
    {
      let messages = await this.messagesService.getLastMessages(500).then();
    
      let newStatusMessage:MessageEntity = {
        id:null,        
        body: `${payload} has entered to this room.`,
        userName:'admin',        
        createdAt:new Date(),  
        status:'Active',
        active:true,

      }
      this.server.emit('messages',newStatusMessage);
      return messages;
    }
    return [];
    
  }

  @SubscribeMessage('messageSent')
  async handleMessageSent(client:any, payload: any) {  
    let msg = payload;
    //Created message.
    //let message=await this.messagesService.createMessage(payload.msg).then();
    if (msg)
    {      
      this.server.emit('messages',msg);
    }
    return ;   
    
  }

  @SubscribeMessage('leftRoom')
  async handleLeftRoom(client:any, payload: any) {  
    let newStatusMessage:MessageEntity = {
      id:null,        
      body: `${payload} has entered to this room.`,
      userName:'admin',        
      createdAt:new Date(),   
      status:'Active',
      active:true,

    }
    this.server.emit('messages',newStatusMessage);
    return ;   
    
  }
}
