import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name:'users'})
export class UserEntity {
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
  hash: string;

  
  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  deletedAt: string;

  @Column()
  status: string;

  @Column()
  active: boolean;

}
