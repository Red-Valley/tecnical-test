import { MessageEntity } from '../../services/messages/entities/message.entity';
import { MessagesService } from '../../services/messages/messages.service';
export declare class MessagesController {
    private service;
    constructor(service: MessagesService);
    getById(params: any): Promise<MessageEntity>;
    get(): Promise<MessageEntity[]>;
    create(message: MessageEntity): Promise<void>;
    update(message: MessageEntity): Promise<void>;
    deleteMessage(params: any): Promise<void>;
}
