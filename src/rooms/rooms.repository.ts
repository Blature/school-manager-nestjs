import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomsRepository extends Repository<Room> {
  private logger = new Logger('RoomsRepository');
  async createRoom(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
    const { name, description, classNumber, field } = createRoomDto;
    const room = this.create({
      name,
      description,
      classNumber,
      field,
      date: Date(),
    });
    try {
      if (user.roll === 'HeadMaster') {
        await this.save(room);
        this.logger.verbose(
          `a Lesson with Name: ${room.name} and Field: ${room.field} created !`
        );
        return room;
      } else {
        this.logger.error(
          `You Do not Have Premision ! You need to be HeadMaster (You are ${user.roll})`
        );
        throw new InternalServerErrorException();
      }
    } catch (err) {
      this.logger.error(`We got An Error ${err.message}`);
      throw new InternalServerErrorException(
        `You Do not Have Premision ! You need to be HeadMaster (You are ${user.roll})`
      );
    }
  }
}
