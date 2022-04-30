import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('SE HA CONECTADO UN INDIVIDUO');
  }

  handleDisconnect(client: any) {
    console.log('SE HA DESCONECTADO UN INDIVIDUO');
  }

  @SubscribeMessage('roomChat/send')
  async sendMessage(@MessageBody() createChatMessageDto: CreateChatMessageDto) {
    await this.chatService.createChatMessage(createChatMessageDto);
    const message = await this.chatService.findLastChatMessage(
      createChatMessageDto.chatRoomId,
    );

    this.server.emit(
      `roomChat/${createChatMessageDto.chatRoomId}/receive`,
      message,
    );
  }
}
