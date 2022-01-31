import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { ToolsService } from '../tools/tools.service';
export declare class MessagesService {
    private messagesRepository;
    private toolsService;
    constructor(messagesRepository: Repository<MessageEntity>, toolsService: ToolsService);
    getMessages(): Promise<MessageEntity[]>;
    getLastMessages(top: number): Promise<MessageEntity[]>;
    getMessageById(_id: string): Promise<MessageEntity>;
    createMessage(message: MessageEntity): Promise<void>;
    updateMessage(Message: MessageEntity): Promise<void>;
    deleteMessage(Message: MessageEntity): Promise<void>;
}
