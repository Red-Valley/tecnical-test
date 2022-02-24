import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { FollowUserDto } from './dto/follow-user.dto';
import { UnFollowUserDto } from './dto/unfollow-user.dto';
import { FollowerService } from './follower.service';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followerService: FollowerService) {}

  @Post('follow')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Follow user' })
  @ApiCreatedResponse({})
  public async followUser(@Body() followUserDto: FollowUserDto) {
    return await this.followerService.followUser(followUserDto);
  }

  @Post('unfollow')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Unfollow user' })
  @ApiCreatedResponse({})
  public async unFollowUer(@Body() unFollowUserDto: UnFollowUserDto) {
    return await this.followerService.unFollowUser(unFollowUserDto);
  }
}
