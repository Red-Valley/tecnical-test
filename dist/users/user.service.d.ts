import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    registerUser(registerUserDto: RegisterUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    private isIdNumberUnique;
}
