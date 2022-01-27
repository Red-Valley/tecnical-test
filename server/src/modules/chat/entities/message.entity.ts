import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name:'messages'})
export class MessageEntity {
  
  @PrimaryColumn()
  @Column({
    primary: true,
    type: 'char',
    length: 36,
  })
  id: string;

  @Column()
  code: string;
  
  
  @Column()
  name: string;


  

}
