import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/room')
  async createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    try {
      await this.chatService.createChatRoom(createChatRoomDto);
      return await this.chatService.findLastChatRoom();
    } catch (error) {
      throw new HttpException(
        'database error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/room')
  async findAllChatRoom() {
    return await this.chatService.findAllChatRoom();
  }

  @Delete('/room/:id')
  async deleteChatRoom(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.chatService.deleteChatRoomMessages(id);
      await this.chatService.deleteChatRoom(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  @Get('/room/:id/messages')
  async findAllChatMessages(@Param('id', ParseIntPipe) id: number) {
    return await this.chatService.findAllChatMessages(id);
  }
}
