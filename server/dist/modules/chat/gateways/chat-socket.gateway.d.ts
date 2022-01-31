import { Server } from 'socket.io';
import { MessagesService } from '../services/messages/messages.service';
import { ToolsService } from '../services/tools/tools.service';
import { UsersService } from '../services/users/users.service';
export declare class ChatSocketGateway {
    private toolsService;
    private usersService;
    private messagesService;
    server: Server;
    constructor(toolsService: ToolsService, usersService: UsersService, messagesService: MessagesService);
    handleJoinRoom(client: any, nickName: string): Promise<any>;
    handleMessageSent(client: any, message: any): Promise<void>;
    handleLeftRoom(client: any, nickName: string): Promise<void>;
}
