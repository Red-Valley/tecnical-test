import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './modules/chat/services/messages/entities/message.entity';
import { UserEntity } from './modules/chat/services/users/entities/user.entity';
import { ChatModule } from './modules/chat/chat.module';
import { ToolsService } from './modules/chat/services/tools/tools.service';
import { UserRoomEntity } from './modules/chat/services/users/entities/user-room.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "admindb",
    "password": "@*DBS3rv3rS31$",
    "database": "db_chat_project",
    "entities": [UserEntity, MessageEntity, UserRoomEntity],
    "synchronize": false,
    autoLoadEntities: true
    
  }),
  ServeStaticModule.forRoot({
     rootPath: join(__dirname, '..', 'dist/app'),
     exclude: ['/api*'],
   })
  ,
  ChatModule],
  providers: [ToolsService],
  
  
})
export class AppModule {}
