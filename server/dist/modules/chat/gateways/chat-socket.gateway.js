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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messages_service_1 = require("../services/messages/messages.service");
const tools_service_1 = require("../services/tools/tools.service");
const users_service_1 = require("../services/users/users.service");
let ChatSocketGateway = class ChatSocketGateway {
    constructor(toolsService, usersService, messagesService) {
        this.toolsService = toolsService;
        this.usersService = usersService;
        this.messagesService = messagesService;
    }
    async handleJoinRoom(client, nickName) {
        let user = await this.usersService.getUserByNickName(nickName).then();
        if (user) {
            let messages = await this.messagesService.getLastMessages(500).then();
            let users = await this.usersService.getUsersInRoom().then();
            if (users.indexOf((x) => x.nickName == nickName) == -1) {
                await this.usersService.JoinRoom({
                    nickName: user.nickName,
                });
            }
            let newId = await this.toolsService.createUUID().then();
            let userJoined = {
                id: newId,
                body: `${nickName} has entered to this room.`,
                nickName: 'room',
                createdAt: new Date(),
            };
            await this.messagesService.createMessage(userJoined).then();
            this.server.emit('userJoined', {
                nickName: user.nickName,
                avatar: user.avatar,
            });
            setTimeout(() => {
                this.server.emit('messages', userJoined);
            }, 3000);
            return messages;
        }
        return [];
    }
    async handleMessageSent(client, message) {
        if (!message.id) {
            message.id = await this.toolsService.createUUID().then();
        }
        message.createdAt = new Date();
        await this.messagesService.createMessage(message).then();
        if (message) {
            this.server.emit('messages', message);
        }
        return;
    }
    async handleLeftRoom(client, nickName) {
        let res = await this.usersService.deleteUserOfRoom(nickName).then();
        if (res) {
            let newId = await this.toolsService.createUUID().then();
            let userLeft = {
                id: newId,
                body: `${nickName} has left to this room.`,
                nickName: 'room',
                createdAt: new Date(),
            };
            await this.messagesService.createMessage(userLeft).then();
            this.server.emit('messages', userLeft);
            setTimeout(() => {
                this.server.emit('userLeft', nickName);
            }, 3000);
            return;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatSocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinedRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatSocketGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageSent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatSocketGateway.prototype, "handleMessageSent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leftRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatSocketGateway.prototype, "handleLeftRoom", null);
ChatSocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [tools_service_1.ToolsService,
        users_service_1.UsersService,
        messages_service_1.MessagesService])
], ChatSocketGateway);
exports.ChatSocketGateway = ChatSocketGateway;
//# sourceMappingURL=chat-socket.gateway.js.map