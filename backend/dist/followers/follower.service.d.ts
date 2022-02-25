import { FollowUserDto } from './dto/follow-user.dto';
import { Model } from 'mongoose';
import { Follower } from './interfaces/follower.interface';
import { UnFollowUserDto } from './dto/unfollow-user.dto';
import { User } from 'src/users/interfaces/user.interface';
export declare class FollowerService {
    private readonly followModel;
    constructor(followModel: Model<Follower>);
    followUser(followUser: FollowUserDto): Promise<Follower>;
    unFollowUser(unFollowUserDto: UnFollowUserDto): Promise<void>;
    getFollowersByUserId(userId: string): Promise<User[]>;
}
