import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {

     }

 
    async getUsers(): Promise<UserEntity[]> {
        return await this.usersRepository.find();
   
      }

      async getUserByUserName(_userName: string): Promise<UserEntity> {
        return await this.usersRepository.findOne({where: [{ "userName": _userName }]
        });
   
      }

    async getUserById(_id: string): Promise<UserEntity> {
        return await this.usersRepository.findOne({where: [{ "id": _id }]
        });
   
      }

      async createUser(user: UserEntity) {
        this.usersRepository.create(user)
    }

    async updateUser(user: UserEntity) {
        this.usersRepository.save(user)
    }

    async deleteUser(user: UserEntity) {
        this.usersRepository.delete(user);
    }

}


