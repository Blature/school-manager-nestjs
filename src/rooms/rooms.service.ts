import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  private logger = new Logger('LessonsService');
  constructor(
    @InjectRepository(RoomsRepository)
    private roomsRepository: RoomsRepository
  ) {}

  createRoom(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
    return this.roomsRepository.createRoom(createRoomDto, user);
  }
}
