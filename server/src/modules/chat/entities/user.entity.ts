import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
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
  salt: string;

  @Column()
  createdAt: string;

  @Column()
  status: string;

  @Column()
  active: boolean;
}
