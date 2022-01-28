import {SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  } from '@nestjs/websockets';

import { Server } from 'socket.io';
import { MessageEntity } from '../services/messages/entities/message.entity';
import { MessagesService } from '../services/messages/messages.service';
import { ToolsService } from '../services/tools/tools.service';
import { UsersService } from '../services/users/users.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatSocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private toolsService:ToolsService,private usersService: UsersService,private messagesService: MessagesService) { }

  @SubscribeMessage('joinedRoom')
  async handleJoinRoom(client: any, payload: string): Promise<MessageEntity[]> {  

    let user = await this.usersService.getUserByUserName(payload).then();

    if (user)
    {
      let messages = await this.messagesService.getLastMessages(500).then();
    let newId = await this.toolsService.createUUID().then();       
      let newUserEntered:MessageEntity = {
        id: newId,        
        body: `${payload} has entered to this room.`,
        userName:'room',        
        createdAt:new Date()     
      }
      this.server.emit('users',newUserEntered);
      return messages;
    }
    return [];
    
  }

  @SubscribeMessage('messageSent')
  async handleMessageSent(client:any, message: any) {  
    if (!message.id)
    {
      message.id = await this.toolsService.createUUID().then();        
    }    
    message.createdAt = new Date();   
    await this.messagesService.createMessage(message).then();
    if (message)
    {      
      this.server.emit('messages',message);
    }
    return ;   
    
  }

  @SubscribeMessage('leftRoom')
  async handleLeftRoom(client:any, payload: any) {  
    let newId = await this.toolsService.createUUID().then();       
      let userLeft:MessageEntity = {
        id: newId,         
      body: `${payload} has left to this room.`,
      userName:'room',        
      createdAt:new Date()     
    }
    this.server.emit('users',userLeft);
    return ;   
    
  }
}
