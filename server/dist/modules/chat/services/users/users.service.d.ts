import { Repository } from 'typeorm';
import { ToolsService } from '../tools/tools.service';
import { AddUserRoomDto } from './dto/add-user-room.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoomEntity } from './entities/user-room.entity';
import { UserEntity } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    private usersRoomsRepository;
    private toolsService;
    constructor(usersRepository: Repository<UserEntity>, usersRoomsRepository: Repository<UserRoomEntity>, toolsService: ToolsService);
    getUsers(): Promise<any[]>;
    getUsersInRoom(): Promise<any[]>;
    getUserByNickName(_nickName: string): Promise<UserEntity>;
    getUserById(_id: string): Promise<UserEntity>;
    JoinRoom(user: AddUserRoomDto): Promise<UserRoomEntity>;
    deleteUserOfRoom(nickName: string): Promise<import("typeorm").DeleteResult>;
    createUser(user: CreateUserDto): Promise<UserEntity | import("typeorm").InsertResult>;
    updateUser(user: UserEntity): Promise<void>;
    deleteUser(user: UserEntity): Promise<void>;
}
