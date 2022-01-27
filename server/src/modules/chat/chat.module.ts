import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';

import { MessageEntity } from './entities/message.entity';
import { MessagesService } from './services/messages/messages.service';
import { MessagesController } from './controllers/messages/messages.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, MessageEntity])],
    providers: [UsersService, MessagesService],
    controllers: [UsersController, MessagesController],
})
export class ChatModule {}
