import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './modules/chat/entities/Message.entity';
import { UserEntity } from './modules/chat/entities/user.entity';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "@.L0c4lS3rv3r",
    "database": "db_chat_project",
    "entities": [UserEntity, MessageEntity],
    "synchronize": false,
    autoLoadEntities: true
    
  }),ChatModule],
  
  
})
export class AppModule {}
