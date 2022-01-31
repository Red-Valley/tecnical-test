"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./services/users/entities/user.entity");
const users_service_1 = require("./services/users/users.service");
const users_controller_1 = require("./controllers/users/users.controller");
const message_entity_1 = require("./services/messages/entities/message.entity");
const messages_service_1 = require("./services/messages/messages.service");
const messages_controller_1 = require("./controllers/messages/messages.controller");
const chat_socket_gateway_1 = require("./gateways/chat-socket.gateway");
const tools_service_1 = require("./services/tools/tools.service");
const user_room_entity_1 = require("./services/users/entities/user-room.entity");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, message_entity_1.MessageEntity, user_room_entity_1.UserRoomEntity])],
        providers: [tools_service_1.ToolsService, chat_socket_gateway_1.ChatSocketGateway, users_service_1.UsersService, messages_service_1.MessagesService],
        controllers: [users_controller_1.UsersController, messages_controller_1.MessagesController],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map