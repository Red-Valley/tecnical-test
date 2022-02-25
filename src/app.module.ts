import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FollowersModule } from './followers/followers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://santest:Helloweenbyname1@cluster0.yvgvh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    UsersModule,
    FollowersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
