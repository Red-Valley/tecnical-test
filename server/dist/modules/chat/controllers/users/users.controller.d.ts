import { ToolsService } from '../../services/tools/tools.service';
import { CreateUserDto } from '../../services/users/dto/create-user.dto';
import { UserEntity } from '../../services/users/entities/user.entity';
import { UsersService } from '../../services/users/users.service';
export declare class UsersController {
    private usersService;
    private toolsService;
    constructor(usersService: UsersService, toolsService: ToolsService);
    getById(params: any): Promise<UserEntity>;
    connected(params: any): Promise<[]>;
    isNickNameValid(params: any): Promise<boolean>;
    create(user: CreateUserDto): Promise<UserEntity>;
    login(user: any): Promise<{
        id: string;
        nickName: any;
        avatar: string;
    }>;
    update(user: UserEntity): Promise<void>;
    deleteUser(params: any): Promise<void>;
}
