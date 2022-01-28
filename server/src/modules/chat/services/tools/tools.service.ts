import { Injectable } from '@nestjs/common';
import crypto  from 'crypto'
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ToolsService {



    
     dateToMySQL(fechaR){
      let  fecha = fechaR.toJSON(); 
      let fechaStr = fecha.replace("T"," ").substring(0,19);
      return fechaStr;
    };
    
    
    async encriptHash(hash, salt) {
      let promise = new Promise(async function(resolve, reject){
        crypto.pbkdf2(hash,salt,10000,64,'sha512',(err, derivedKey)=>{
          if(err) throw err;
           resolve(derivedKey.toString('hex'));
       });
       
       
    }); 
    return promise;
    
    };
    
    async checkHash (hashU,hash, salt) {
      let promise = new Promise(async function(resolve, reject){
    
       let hashEncrypted = await this.encriptHash(hashU,salt).then();   
       resolve(hashEncrypted==hash)  
    
    }); 
    return promise;
    
    };
    
   async createSalt() {
      let promise = new Promise(function(resolve, reject){
      let salt = crypto.randomBytes(128).toString('base64');
      resolve(salt);
    }); 
    return promise;
    
    };
    
   
    
    async createUUID():Promise<string>{
      var promise = new Promise<string>(function(resolve, reject){      
          let code = uuidv4();
          resolve(code);   
    }); 
    return promise;
    
    }; 
}
