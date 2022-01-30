import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users_rooms' })
export class UserRoomEntity {
  @PrimaryColumn()
  @Column({
    primary: true,
    type: 'char',
    length: 36,
  })
  id: string;
  
  @Column()
  roomId: string;

  @Column()
  nickName: string;


  @Column()
  createdAt: string;

}
