import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IMessage } from '../interfaces/message.interface';
@Entity({ name: 'messages' })
export class MessageEntity implements IMessage {
  @PrimaryColumn()
  @Column({
    primary: true,
    type: 'char',
    length: 36,
  })
  id: string;

  @Column()
  nickName: string;

  @Column()
  body: string;

  @Column()
  createdAt: Date;
 
}
