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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const tools_service_1 = require("../tools/tools.service");
let MessagesService = class MessagesService {
    constructor(messagesRepository, toolsService) {
        this.messagesRepository = messagesRepository;
        this.toolsService = toolsService;
    }
    async getMessages() {
        return await this.messagesRepository.find();
    }
    async getLastMessages(top) {
        return await this.messagesRepository.find({
            order: {
                ['createdAt']: 'DESC',
            },
            take: top,
        });
    }
    async getMessageById(_id) {
        return await this.messagesRepository.findOne({ where: [{ id: _id }] });
    }
    async createMessage(message) {
        if (!message.id) {
            message.id = await this.toolsService.createUUID().then();
        }
        this.messagesRepository.insert(message);
    }
    async updateMessage(Message) {
        this.messagesRepository.save(Message);
    }
    async deleteMessage(Message) {
        this.messagesRepository.delete(Message);
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.MessageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tools_service_1.ToolsService])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map