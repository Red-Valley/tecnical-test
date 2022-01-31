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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const tools_service_1 = require("../../services/tools/tools.service");
const create_user_dto_1 = require("../../services/users/dto/create-user.dto");
const user_entity_1 = require("../../services/users/entities/user.entity");
const users_service_1 = require("../../services/users/users.service");
let UsersController = class UsersController {
    constructor(usersService, toolsService) {
        this.usersService = usersService;
        this.toolsService = toolsService;
    }
    async getById(params) {
        return await this.usersService.getUserById(params.id).then();
    }
    async connected(params) {
        let users;
        switch (params.status) {
            case 'connected':
                users = await this.usersService.getUsersInRoom().then();
                break;
        }
        return users;
    }
    async isNickNameValid(params) {
        try {
            let user = await this.usersService
                .getUserByNickName(params.nickName)
                .then();
            return !user ? true : false;
        }
        catch (error) {
            return false;
        }
    }
    async create(user) {
        return await this.usersService.createUser(user).then();
    }
    async login(user) {
        try {
            let userFound = await this.usersService
                .getUserByNickName(user.nickName)
                .then();
            if (!userFound) {
                return null;
            }
            let isValidLogin = await this.toolsService.checkHash(user.hash, userFound.hash, userFound.salt);
            if (isValidLogin) {
                return {
                    id: userFound.id,
                    nickName: user.nickName,
                    avatar: userFound.avatar,
                };
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(user) {
        return await this.usersService.updateUser(user).then();
    }
    async deleteUser(params) {
        return await this.usersService.deleteUser(params.id).then();
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("status/:status"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "connected", null);
__decorate([
    (0, common_1.Get)('isNickNameValid/:nickName'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "isNickNameValid", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tools_service_1.ToolsService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map