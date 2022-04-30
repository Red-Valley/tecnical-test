import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoomMessage } from './entities/chat-room-message.entity';
import { ChatRoom } from './entities/chat-room.entity';

@Injectable()
export class ChatService {
  @Inject('client') client: PoolClient;

  async createChatRoom(createChatRoomDto: CreateChatRoomDto): Promise<void> {
    const { name } = createChatRoomDto;

    await this.client.query('INSERT INTO chat_rooms (name) VALUES ($1)', [
      name,
    ]);
  }

  async findAllChatRoom(): Promise<ChatRoom[]> {
    const result = await this.client.query('SELECT * FROM chat_rooms');
    return result.rows as ChatRoom[];
  }

  async findLastChatRoom(): Promise<ChatRoom | undefined> {
    const result = await this.client.query(
      'SELECT * FROM chat_rooms ORDER BY id DESC LIMIT 1',
    );

    if (result.rows.length > 0) {
      return result.rows[0] as ChatRoom;
    }
  }

  async createChatMessage(
    createChatMessageDtoDto: CreateChatMessageDto,
  ): Promise<void> {
    const { message, chatRoomId, userId } = createChatMessageDtoDto;

    await this.client.query(
      `INSERT INTO chat_rooms_messages (message, datetime, user_id, chat_room_id) 
      VALUES ($1, $2, $3, $4)`,
      [message, new Date(), userId, chatRoomId],
    );
  }

  async findLastChatMessage(
    idChatRoom: number,
  ): Promise<ChatRoomMessage | undefined> {
    const result = await this.client.query(
      `SELECT 
        rm.id, rm.user_id AS "userId", 
        rm.chat_room_id AS "chatRoomId", 
        rm.datetime, rm.message, u.username 
      FROM chat_rooms_messages AS rm
      INNER JOIN users AS u ON u.id = rm.user_id 
      WHERE rm.chat_room_id = $1
      ORDER BY id DESC
      LIMIT 1
      `,
      [idChatRoom],
    );

    if (result.fields.length > 0) {
      return result.rows[0];
    }
  }

  async findAllChatMessages(idChatRoom: number): Promise<ChatRoomMessage[]> {
    const result = await this.client.query(
      ` SELECT 
          rm.id, rm.user_id AS "userId", 
          rm.chat_room_id AS "chatRoomId", 
          rm.datetime, rm.message, u.username 
        FROM chat_rooms_messages AS rm
        INNER JOIN users AS u ON u.id = rm.user_id
        WHERE rm.chat_room_id = $1
        ORDER by rm.datetime ASC
      `,
      [idChatRoom],
    );

    return result.rows;
  }

  async deleteChatRoomMessages(idChatRoom: number): Promise<void> {
    await this.client.query(
      `DELETE FROM chat_rooms_messages WHERE chat_room_id = $1`,
      [idChatRoom],
    );
  }

  async deleteChatRoom(idChatRoom: number): Promise<void> {
    await this.client.query(`DELETE FROM chat_rooms WHERE id = $1`, [
      idChatRoom,
    ]);
  }
}
