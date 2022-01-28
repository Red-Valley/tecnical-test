import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './services/users/entities/user.entity';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';

import { MessageEntity } from './services/messages/entities/message.entity';
import { MessagesService } from './services/messages/messages.service';
import { MessagesController } from './controllers/messages/messages.controller';
import { ChatSocketGateway } from './gateways/chat-socket.gateway';
import { ToolsService } from './services/tools/tools.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, MessageEntity])],
    providers: [ToolsService, ChatSocketGateway,UsersService, MessagesService],
    controllers: [UsersController, MessagesController],
})
export class ChatModule {}
