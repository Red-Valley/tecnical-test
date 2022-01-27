import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { UsersService } from '../../services/users/users.service';


@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }



    @Get(':id')
    async getById(@Param() params) {
        return await this.service.getUser(params.id).then();
    }

    @Get()
    async get() {
        return await this.service.getUsers().then();   
     }


    @Post()
    async create(@Body() user: UserEntity) {
        return await this.service.createUser(user).then();
    }

    @Put()
    async update(@Body() user: UserEntity) {
        return await this.service.updateUser(user).then();
    }

    @Delete(':id')
    async deleteUser(@Param() params) {
        return await this.service.deleteUser(params.id).then();
    }
}