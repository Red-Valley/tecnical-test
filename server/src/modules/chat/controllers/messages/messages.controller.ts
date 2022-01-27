import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { MessageEntity } from '../../entities/message.entity';
import { MessagesService } from '../../services/messages/messages.service';


@Controller('messages')
export class MessagesController {

    constructor(private service: MessagesService) { }



    @Get(':id')
    async getById(@Param() params) {
        return await this.service.getMessage(params.id).then();
    }

    @Get()
    async get() {
        return await this.service.getMessages().then();   
     }


    @Post()
    async create(@Body() message: MessageEntity) {
        return await this.service.createMessage(message).then();
    }

    @Put()
    async update(@Body() message: MessageEntity) {
        return await this.service.updateMessage(message).then();
    }

    @Delete(':id')
    async deleteMessage(@Param() params) {
        return await this.service.deleteMessage(params.id).then();
    }
}