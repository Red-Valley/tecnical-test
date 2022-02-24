import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerUserDto: RegisterUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
