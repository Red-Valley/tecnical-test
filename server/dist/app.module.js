"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("./modules/chat/services/messages/entities/message.entity");
const user_entity_1 = require("./modules/chat/services/users/entities/user.entity");
const chat_module_1 = require("./modules/chat/chat.module");
const tools_service_1 = require("./modules/chat/services/tools/tools.service");
const user_room_entity_1 = require("./modules/chat/services/users/entities/user-room.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                "type": "mysql",
                "host": "127.0.0.1",
                "port": 3306,
                "username": "root",
                "password": "@.L0c4lS3rv3r",
                "database": "db_chat_project",
                "entities": [user_entity_1.UserEntity, message_entity_1.MessageEntity, user_room_entity_1.UserRoomEntity],
                "synchronize": false,
                autoLoadEntities: true
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'dist/app'),
                exclude: ['/api*'],
            }),
            chat_module_1.ChatModule],
        providers: [tools_service_1.ToolsService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map