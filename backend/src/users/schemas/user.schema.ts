import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ unique: true })
  idNumber: string;
  @Prop({ uppercase: true })
  idType: 'CC' | 'CE' | 'TI' | 'PASS ID';
  @Prop()
  address: string;
  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
