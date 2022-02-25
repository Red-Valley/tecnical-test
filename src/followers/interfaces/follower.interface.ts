import { Document } from 'mongoose';

export interface Follower extends Document {
  readonly userFollowerId: string;
  readonly userId: string;
}
