import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../../entities/message.entity';

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(MessageEntity) private messagesRepository: Repository<MessageEntity>) {

     }

   async getMessages(): Promise<MessageEntity[]> {
        return await this.messagesRepository.find();
    }

    async getMessage(_id: string): Promise<MessageEntity[]> {
        return await this.messagesRepository.find({where: [{ "id": _id }]
        });
   
      }

      async createMessage(Message: MessageEntity) {
        this.messagesRepository.create(Message)
    }

    async updateMessage(Message: MessageEntity) {
        this.messagesRepository.save(Message)
    }

    async deleteMessage(Message: MessageEntity) {
        this.messagesRepository.delete(Message);
    }

}


