"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tools_service_1 = require("../tools/tools.service");
const user_room_entity_1 = require("./entities/user-room.entity");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository, usersRoomsRepository, toolsService) {
        this.usersRepository = usersRepository;
        this.usersRoomsRepository = usersRoomsRepository;
        this.toolsService = toolsService;
    }
    async getUsers() {
        return await this.usersRoomsRepository.find();
    }
    async getUsersInRoom() {
        let usersInRoom = await this.usersRoomsRepository.find().then();
        let allUsers = await this.usersRepository.find().then();
        let users = allUsers.map((x) => {
            return { nickName: x.nickName, avatar: x.avatar };
        });
        let nickNames = usersInRoom.map((x) => x.nickName);
        return users.filter((x) => nickNames.includes(x.nickName));
    }
    async getUserByNickName(_nickName) {
        return await this.usersRepository.findOne({
            where: [{ nickName: _nickName }],
        });
    }
    async getUserById(_id) {
        return await this.usersRepository.findOne({ where: [{ id: _id }] });
    }
    async JoinRoom(user) {
        let newUserId = await this.toolsService.createUUID().then();
        let newUserRoom = {
            id: newUserId,
            nickName: user.nickName,
            createdAt: new Date().toISOString().substring(0, 18).replace('T', ' '),
            roomId: '96a210d4-ad3b-4129-9665-2aeebb3428e0',
        };
        let res = await this.usersRoomsRepository.insert(newUserRoom).then();
        return newUserRoom;
    }
    async deleteUserOfRoom(nickName) {
        let res = await this.usersRoomsRepository
            .delete({ nickName: nickName })
            .then();
        return res;
    }
    async createUser(user) {
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
            let newUser = {
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
    async updateUser(user) {
        this.usersRepository.save(user);
    }
    async deleteUser(user) {
        this.usersRepository.delete(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_room_entity_1.UserRoomEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        tools_service_1.ToolsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map