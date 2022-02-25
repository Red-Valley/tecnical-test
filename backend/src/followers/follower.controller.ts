import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { User } from 'src/users/interfaces/user.interface';
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

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get followers' })
  @ApiCreatedResponse({})
  public async getFollowersByUserId(@Param('id') id: string): Promise<User[]> {
    return await this.followerService.getFollowersByUserId(id);
  }
}
