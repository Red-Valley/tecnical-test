import { Injectable } from '@nestjs/common';
import {pbkdf2, randomBytes} from 'crypto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ToolsService {
  constructor() {}

  dateToMySQL(fechaR) {
    let fecha = fechaR.toJSON();
    let fechaStr = fecha.replace('T', ' ').substring(0, 19);
    return fechaStr;
  }

  async encriptHash(hash: string, salt: string): Promise<any> {
    let promise = new Promise<any>((resolve, reject)=> {
       pbkdf2(hash,salt,10000,64,'sha512',(err, derivedKey)=>{
           if(err) throw err;
           let newhash:string = derivedKey.toString('hex');
      resolve(newhash);
       });
    });
    return promise;
  }

  async checkHash(attemp: string, hash: string, salt: string): Promise<any> {
    let promise = new Promise<any>(async (resolve, reject)=>{
      let hashEncrypted = await this.encriptHash(attemp, salt).then();    
      resolve(hashEncrypted === hash);
    });
    return promise;
  }

  async createSalt(): Promise<any> {
    let promise = new Promise<any>((resolve, reject)=> {
      let salt = randomBytes(128).toString('base64');
      resolve(salt);
    });
    return promise;
  }

  async createUUID(): Promise<string> {
    let promise = new Promise<string>((resolve, reject)=> {
      let code = uuidv4();
      resolve(code);
    });
    return promise;
  }
}
