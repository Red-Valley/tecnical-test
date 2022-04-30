import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateChatMessageDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  message: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  chatRoomId: number;
}
