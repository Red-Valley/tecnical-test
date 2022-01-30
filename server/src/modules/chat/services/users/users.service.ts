import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolsService } from '../tools/tools.service';
import { AddUserRoomDto } from './dto/add-user-room.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoomEntity } from './entities/user-room.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserRoomEntity)
    private usersRoomsRepository: Repository<UserRoomEntity>,
    private toolsService: ToolsService,
  ) {}

  async getUsers(): Promise<any[]> {
    return await this.usersRoomsRepository.find();
  }

  async getUsersInRoom(): Promise<any[]> {
    let usersInRoom = await this.usersRoomsRepository.find().then();
    let allUsers = await this.usersRepository.find().then();
    let users = allUsers.map((x) => {
      return { nickName: x.nickName, avatar: x.avatar };
    });
    let nickNames = usersInRoom.map((x) => x.nickName);
    return users.filter((x) => nickNames.includes(x.nickName));
  }

  async getUserByNickName(_nickName: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: [{ nickName: _nickName }],
    });
  }

  async getUserById(_id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: [{ id: _id }] });
  }

  async JoinRoom(user: AddUserRoomDto) {
    let newUserId = await this.toolsService.createUUID().then();

    let newUserRoom: UserRoomEntity = {
      id: newUserId,
      nickName: user.nickName,
      createdAt: new Date().toISOString().substring(0, 18).replace('T', ' '),
      roomId: '96a210d4-ad3b-4129-9665-2aeebb3428e0',
    };
    let res = await this.usersRoomsRepository.insert(newUserRoom).then();

    return newUserRoom;
  }

  async deleteUserOfRoom(nickName: string) {
    let res = await this.usersRoomsRepository
      .delete({ nickName: nickName })
      .then();
    return res;
  }
  async createUser(user: CreateUserDto) {
    let userFound = await this.usersRepository
      .findOne({
        where: [{ nickName: user.nickName }],
      })
      .then();
    if (!userFound) {
      let newUserId = await this.toolsService.createUUID().then();
      let newSalt = await this.toolsService.createSalt().then();
      let encriptedHash = await this.toolsService
        .encriptHash(user.hash, newSalt)
        .then();
      let newUser: UserEntity = {
        id: newUserId,
        avatar: user.avatar,
        nickName: user.nickName,
        createdAt: new Date().toISOString().substring(0, 18).replace('T', ' '),
        hash: encriptedHash,
        salt: newSalt,
      };
      let res = await this.usersRepository.insert(newUser).then();      
      return res;
    }
    return userFound;
  }

  async updateUser(user: UserEntity) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: UserEntity) {
    this.usersRepository.delete(user);
  }
}
