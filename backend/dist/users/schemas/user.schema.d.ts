/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/error" />
import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    firstName: string;
    lastName: string;
    idNumber: string;
    idType: 'CC' | 'CE' | 'TI' | 'PASS ID';
    address: string;
    phoneNumber: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any, any>;
