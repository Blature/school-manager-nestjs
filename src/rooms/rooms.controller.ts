import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(AuthGuard())
export class RoomsController {
  private logger = new Logger('LessonsController');
  constructor(private RoomsService: RoomsService) {}

  @Post()
  createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @GetUser() user: User
  ): Promise<Room> {
    return this.RoomsService.createRoom(createRoomDto, user);
  }
}
