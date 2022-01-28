import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryColumn()
  @Column({
    primary: true,
    type: 'char',
    length: 36,
  })
  id: string;

  @Column()
  userName: string;

  @Column()
  body: string;

  @Column()
  createdAt: Date;

  @Column()
  status: string;

  @Column()
  active: boolean;
}
