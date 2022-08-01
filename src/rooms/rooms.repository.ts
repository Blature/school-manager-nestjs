import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetFilterRoomDto } from './dto/get-filter-room.dto';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomsRepository extends Repository<Room> {
  private logger = new Logger('RoomsRepository');
  async createRoom(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
    const { name, description, classNumber, field, lessons } = createRoomDto;
    const room = this.create({
      name,
      description,
      classNumber,
      field,
      date: Date(),
      lessons,
    });
    try {
      if (user.roll === 'HeadMaster') {
        await this.save(room);
        this.logger.verbose(
          `a ClassRoom with Name: ${room.name} and Field: ${room.field} created !`
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

  async getRooms(
    getFilterRoomDto: GetFilterRoomDto,
    user: User
  ): Promise<Room[]> {
    const { search, field } = getFilterRoomDto;
    const query = this.createQueryBuilder('room');

    if (user.roll === 'HeadMaster' || user.roll === 'Teacher') {
      if (search) {
        query.andWhere(
          '(LOWER (room.title) LIKE LOWER (:search) OR LOWER (room.classNumber) LIKE LOWER (:search))',
          { search: `%${search}%` }
        );
      }

      if (field) {
        query.andWhere('room.field = :field', { field });
      }
      try {
        const room = await query.getMany();
        this.logger.verbose(
          `Search done! filters: ${JSON.stringify(getFilterRoomDto)}`
        );
        return room;
      } catch (err) {
        this.logger.error(
          `someone try to search with this filters : ${JSON.stringify(
            getFilterRoomDto
          )} and we got an error ${err.message}`
        );
        throw new InternalServerErrorException();
      }
    } else {
      this.logger.error(`You Do not have Permision to do this !`);
      throw new InternalServerErrorException(
        `You Do not have Permision to do this !`
      );
    }
  }
}
