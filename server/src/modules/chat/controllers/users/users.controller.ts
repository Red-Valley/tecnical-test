import {
  Controller,
  Post,
  Body,
  Response,
  Get,
  Put,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ToolsService } from '../../services/tools/tools.service';
import { CreateUserDto } from '../../services/users/dto/create-user.dto';
import { UserEntity } from '../../services/users/entities/user.entity';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private toolsService: ToolsService,
  ) {}

  @Get(':id')
  async getById(@Param() params) {
    return await this.usersService.getUserById(params.id).then();
  }

  @Get("status/:status")
  async connected(@Param() params) {
    let users:[];
    switch(params.status)
    {
      case 'connected':
        users= await this.usersService.getUsersInRoom().then();
        break;
    }
    return users;
  }

  @Get('isNickNameValid/:nickName')
  async isNickNameValid(@Param() params): Promise<boolean> {
    try {
      let user = await this.usersService
      .getUserByNickName(params.nickName)
      .then();
    return !user ? true : false;  
    } catch (error) {
      return false;
    }
    
  }

  @Post('/create')
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(user).then();
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() user: any){

    try {
      let userFound = await this.usersService
        .getUserByNickName(user.nickName)
        .then();
      if (!userFound) {
        return null;
      }
      let isValidLogin = await this.toolsService.checkHash(
        user.hash,
        userFound.hash,
        userFound.salt,
      );
      if (isValidLogin) {
        return {
          id: userFound.id,
          nickName: user.nickName,
          avatar: userFound.avatar,
        };
      }
    } catch (error) {
        console.log(error)
      return null;
    }
    
  }

  @Put()
  async update(@Body() user: UserEntity) {
    return await this.usersService.updateUser(user).then();
  }

  @Delete(':id')
  async deleteUser(@Param() params) {
    return await this.usersService.deleteUser(params.id).then();
  }
}
