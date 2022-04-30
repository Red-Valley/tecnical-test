import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @Inject('client') client: PoolClient;

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { username } = createUserDto;

    const result = await this.client.query(
      'INSERT INTO users (username) VALUES ($1)',
      [username],
    );

    return result;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const result = await this.client.query(
      'SELECT * FROM users WHERE username = $1',
      [username],
    );

    if (result.rowCount > 0) {
      return result.rows[0] as User;
    }
  }

  async findById(id: number): Promise<User | undefined> {
    const result = await this.client.query(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );

    if (result.rowCount > 0) {
      return result.rows[0] as User;
    }
  }

  async findLast(): Promise<User | undefined> {
    const result = await this.client.query(
      'SELECT * FROM users ORDER BY id DESC LIMIT 1',
    );

    if (result.rowCount > 0) {
      return result.rows[0] as User;
    }
  }
}
