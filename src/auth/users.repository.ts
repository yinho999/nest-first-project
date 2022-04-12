import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //   Extract the username and password from the DTO
    const { username, password } = authCredentialsDto;

    //   Create user
    const user = this.create({ username, password });

    try {
      //   Save User
      await this.save(user);
    } catch (error) {
      //   Duplicate username
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      //  Unknown error
      else {
        throw new InternalServerErrorException();
      }
    }
  }
}
