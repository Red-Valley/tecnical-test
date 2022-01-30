import { IsInt, IsString } from 'class-validator';

export class AddUserRoomDto {
  @IsString()
  readonly nickName: string;
    
}
