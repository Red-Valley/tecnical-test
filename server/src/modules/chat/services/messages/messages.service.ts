import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../../entities/message.entity';
import { ToolsService } from '../tools/tools.service';


@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageEntity) private messagesRepository: Repository<MessageEntity>,
        private toolsService:ToolsService
        ) {

     }

   async getMessages(): Promise<MessageEntity[]> {
        return await this.messagesRepository.find();
    }

    async getLastMessages(top:number): Promise<MessageEntity[]> {
        return await this.messagesRepository.find({order: {
            ['createdAt']: 'DESC',
                  },
          take: top,
        });
    }

    async getMessageById(_id: string): Promise<MessageEntity> {
        return await this.messagesRepository.findOne({where: [{ "id": _id }]});
   
      }

      async createMessage(message: MessageEntity) {
        message.id = await this.toolsService.createUUID().then();        
        this.messagesRepository.create(message)
    }

    async updateMessage(Message: MessageEntity) {
        this.messagesRepository.save(Message)
    }

    async deleteMessage(Message: MessageEntity) {
        this.messagesRepository.delete(Message);
    }

}


