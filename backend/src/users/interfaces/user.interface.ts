import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly idNumber: string;
  readonly idType: 'CC' | 'CE' | 'TI' | 'PASS ID';
  readonly address: string;
  readonly phoneNumber: string;
}
