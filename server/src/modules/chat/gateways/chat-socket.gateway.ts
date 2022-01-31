import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { threadId } from 'worker_threads';
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

  constructor(
    private toolsService: ToolsService,
    private usersService: UsersService,
    private messagesService: MessagesService,
  ) {}





  @SubscribeMessage('joinedRoom')
  async handleJoinRoom(client: any, nickName: string): Promise<any> {
    let user = await this.usersService.getUserByNickName(nickName).then();
    if (user) {
      let messages = await this.messagesService.getLastMessages(500).then();
      let users = await this.usersService.getUsersInRoom().then();
      if (users.indexOf((x) => x.nickName == nickName) == -1) {
         await this.usersService.JoinRoom({
          nickName: user.nickName,
        });
      }

      let newId = await this.toolsService.createUUID().then();
      let userJoined: MessageEntity = {
        id: newId,
        body: `${nickName} has entered to this room.`,
        nickName: 'room',
        createdAt: new Date(),
      };
      await this.messagesService.createMessage(userJoined).then();        
      this.server.emit('userJoined', {
        nickName: user.nickName,
        avatar: user.avatar,
      });
        setTimeout(()=>{
          this.server.emit('messages', userJoined);
        },3000);  
      
      
      return messages;
    }
    return [];
  }

  @SubscribeMessage('messageSent')
  async handleMessageSent(client: any, message: any) {
    if (!message.id) {
      message.id = await this.toolsService.createUUID().then();
    }
    message.createdAt = new Date();
    await this.messagesService.createMessage(message).then();
    if (message) {
      this.server.emit('messages', message);
    }
    return;
  }

  @SubscribeMessage('leftRoom')
  async handleLeftRoom(client: any, nickName: string) {
    let res = await this.usersService.deleteUserOfRoom(nickName).then();

    if (res) {
      let newId = await this.toolsService.createUUID().then();    
      let userLeft: MessageEntity = {
        id: newId,
        body: `${nickName} has left to this room.`,
        nickName: 'room',
        createdAt: new Date(),
      };      
      await this.messagesService.createMessage(userLeft).then();     
      this.server.emit('messages', userLeft);      
      setTimeout(()=>{
        this.server.emit('userLeft', nickName);  
      },3000);  
      
      
      return;
    }
  }
}
