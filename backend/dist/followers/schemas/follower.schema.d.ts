/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Document } from 'mongoose';
export declare type UserDocument = Follower & Document;
export declare class Follower {
    userFollowerId: string;
    userId: string;
}
export declare const FollowerSchema: import("mongoose").Schema<Document<Follower, any, any>, import("mongoose").Model<Document<Follower, any, any>, any, any, any>, any, any>;
