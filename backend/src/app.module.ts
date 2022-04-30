import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'DEV' ? '.env' : undefined,
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_HOST: joi.string().required(),
        DATABASE_NAME: joi.string().required(),
        DATABASE_USER: joi.string().required(),
        DATABASE_PORT: joi.number().required(),
        DATABASE_PASSWORD: joi.string().required(),
        PORT: joi.number().required(),
      }),
    }),
    ChatModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
