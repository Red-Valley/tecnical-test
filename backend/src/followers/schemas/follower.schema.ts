import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Follower & Document;

@Schema()
export class Follower {
  @Prop()
  userFollowerId: string;
  @Prop()
  userId: string;
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);
