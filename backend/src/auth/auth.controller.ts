import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('/login')
  async validateCredentials(@Body() loginDto: LoginDto) {
    return await this.userService.findByUsername(loginDto.username);
  }
}
