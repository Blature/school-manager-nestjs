import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository');
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password, fullName, roll } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
      fullName,
      roll,
      date: Date(),
    });
    try {
      await this.save(user);
      return user;
      this.logger.verbose(
        `a User with Username: "${user.username}", Name: "${user.fullName}", Roll: "${user.roll}"`
      );
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error(`username: "${user.username}" already Exists !`);
        throw new ConflictException(
          `username: "${user.username}" already Exists !`
        );
      }
      this.logger.error(
        `we got and error for username: "${user.username}" the error is: "${error.message}"`
      );
      throw new InternalServerErrorException();
    }
  }
}
