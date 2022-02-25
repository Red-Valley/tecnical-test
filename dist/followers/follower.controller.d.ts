import { User } from 'src/users/interfaces/user.interface';
import { FollowUserDto } from './dto/follow-user.dto';
import { UnFollowUserDto } from './dto/unfollow-user.dto';
import { FollowerService } from './follower.service';
export declare class FollowersController {
    private readonly followerService;
    constructor(followerService: FollowerService);
    followUser(followUserDto: FollowUserDto): Promise<import("./interfaces/follower.interface").Follower>;
    unFollowUer(unFollowUserDto: UnFollowUserDto): Promise<void>;
    getFollowersByUserId(id: string): Promise<User[]>;
}
