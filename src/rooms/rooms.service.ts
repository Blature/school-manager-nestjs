import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetFilterRoomDto } from './dto/get-filter-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './room.entity';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  private logger = new Logger('RoomsService');
  constructor(
    @InjectRepository(RoomsRepository)
    private roomsRepository: RoomsRepository
  ) {}

  createRoom(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
    return this.roomsRepository.createRoom(createRoomDto, user);
  }

  getRooms(getFilterRoomDto: GetFilterRoomDto, user: User): Promise<Room[]> {
    return this.roomsRepository.getRooms(getFilterRoomDto, user);
  }

  async getRoomById(id: string, user: User): Promise<Room> {
    if (user.roll === 'HeadMaster' || user.roll === 'Teacher') {
      const room = await this.roomsRepository.findOne({ where: { id } });

      if (!room) {
        this.logger.error(`We cant Find room with ID: ${id}`);
        throw new NotFoundException(
          `We cant Find your room With this Id : ${id}`
        );
      }
      return room;
    } else {
      this.logger.error(`You Do not have Permision to do this !`);
      throw new InternalServerErrorException(
        `You Do not have Permision to do this !`
      );
    }
  }

  async deleteRoom(id: string, user: User): Promise<void> {
    if (user.roll === 'HeadMaster') {
      await this.getRoomById(id, user);
      try {
        this.logger.verbose(`a Room With ID: ${id} has been deleted !`);
        await this.roomsRepository.delete({ id });
      } catch (err) {
        this.logger.error(
          `Something went Wrong in deleting ${id} the error message : ${err.message}`
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

  async updateRoom(
    id: string,
    updateRoomDto: UpdateRoomDto,
    user: User
  ): Promise<Room> {
    if (user.roll === 'HeadMaster') {
      const room = await this.getRoomById(id, user);
      const { title, field, classNumber, description } = updateRoomDto;

      room.name = title;
      room.description = description;
      room.classNumber = classNumber;
      room.field = field;

      await this.roomsRepository.save(room);
      return room;
    } else {
      this.logger.error(`You Do not have Permision to do this !`);
      throw new InternalServerErrorException(
        `You Do not have Permision to do this !`
      );
    }
  }

  // async updateRoomTeacher(id:string,): Promise<Room> {}
}
