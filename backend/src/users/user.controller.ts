import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Register user' })
  @ApiCreatedResponse({})
  public async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<User> {
    console.log("🚀 ~ file: user.controller.ts ~ line 32 ~ UserController ~ registerUserDto", registerUserDto)
    return await this.userService.registerUser(registerUserDto);
  }

  @Get('all-users')
  @HttpCode(HttpStatus.OK)
  public async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
