import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  public async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const user = new this.userModel(registerUserDto);
    await this.isIdNumberUnique(user.idNumber);
    return await user.save();
  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userModel.find({}, {}, { skip: 10 });
  }

  /**
   * PRIVATE FUNCTIONS
   */
  private async isIdNumberUnique(idNumber: string) {
    const user = await this.userModel.findOne({ idNumber, verified: true });
    if (user) {
      throw new BadRequestException('Email most be unique.');
    }
  }
}
