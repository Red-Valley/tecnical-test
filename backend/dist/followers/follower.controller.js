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
exports.FollowersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const follow_user_dto_1 = require("./dto/follow-user.dto");
const unfollow_user_dto_1 = require("./dto/unfollow-user.dto");
const follower_service_1 = require("./follower.service");
let FollowersController = class FollowersController {
    constructor(followerService) {
        this.followerService = followerService;
    }
    async followUser(followUserDto) {
        return await this.followerService.followUser(followUserDto);
    }
    async unFollowUer(unFollowUserDto) {
        return await this.followerService.unFollowUser(unFollowUserDto);
    }
    async getFollowersByUserId(id) {
        return await this.followerService.getFollowersByUserId(id);
    }
};
__decorate([
    (0, common_1.Post)('follow'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ description: 'Follow user' }),
    (0, swagger_1.ApiCreatedResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_user_dto_1.FollowUserDto]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "followUser", null);
__decorate([
    (0, common_1.Post)('unfollow'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ description: 'Unfollow user' }),
    (0, swagger_1.ApiCreatedResponse)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unfollow_user_dto_1.UnFollowUserDto]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "unFollowUer", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ description: 'Get followers' }),
    (0, swagger_1.ApiCreatedResponse)({}),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowersController.prototype, "getFollowersByUserId", null);
FollowersController = __decorate([
    (0, common_1.Controller)('followers'),
    __metadata("design:paramtypes", [follower_service_1.FollowerService])
], FollowersController);
exports.FollowersController = FollowersController;
//# sourceMappingURL=follower.controller.js.map