import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowersController } from './follower.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowerSchema } from './schemas/follower.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Follower', schema: FollowerSchema }]),
  ],

  providers: [FollowerService],
  controllers: [FollowersController],
})
export class FollowersModule {}
