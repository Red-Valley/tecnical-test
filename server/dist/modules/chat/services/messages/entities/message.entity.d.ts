import { IMessage } from '../interfaces/message.interface';
export declare class MessageEntity implements IMessage {
    id: string;
    nickName: string;
    body: string;
    createdAt: Date;
}
