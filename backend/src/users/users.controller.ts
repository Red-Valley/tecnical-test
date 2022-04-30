import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByUsername(createUserDto.username);
    const createError = new HttpException(
      'duplicate user',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    if (!user) {
      try {
        await this.usersService.create(createUserDto);
        return await this.usersService.findLast();
      } catch (error) {
        throw createError;
      }
    } else {
      throw createError;
    }
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);

    if (!user) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
