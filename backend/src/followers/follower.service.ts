import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FollowUserDto } from './dto/follow-user.dto';
import { Model } from 'mongoose';
import { Follower } from './interfaces/follower.interface';
import { UnFollowUserDto } from './dto/unfollow-user.dto';

@Injectable()
export class FollowerService {
  constructor(
    @InjectModel('Follower') private readonly followModel: Model<Follower>,
  ) {}

  public async followUser(followUser: FollowUserDto): Promise<Follower> {
    const followerSave = {
      userId: followUser.userId,
      userFollowerId: followUser.userToFollowId,
    };
    const follower = new this.followModel(followerSave);
    return await follower.save();
  }

  public async unFollowUser(unFollowUserDto: UnFollowUserDto): Promise<void> {
    await this.followModel.findOneAndDelete({
      userFollowerId: unFollowUserDto.followerId,
    });
  }
}
