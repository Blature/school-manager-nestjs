import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetFilterRoomDto } from './dto/get-filter-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(AuthGuard())
export class RoomsController {
  private logger = new Logger('LessonsController');
  constructor(private roomsService: RoomsService) {}

  @Post()
  createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @GetUser() user: User
  ): Promise<Room> {
    return this.roomsService.createRoom(createRoomDto, user);
  }

  @Get()
  GetRooms(
    @Query() getFilterRoomDto: GetFilterRoomDto,
    @GetUser() user: User
  ): Promise<Room[]> {
    return this.roomsService.getRooms(getFilterRoomDto, user);
  }

  @Get('/:id')
  getRoomById(@Param('id') id: string, @GetUser() user: User): Promise<Room> {
    return this.roomsService.getRoomById(id, user);
  }

  @Delete('/:id')
  deleteRoom(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.roomsService.deleteRoom(id, user);
  }

  @Put('/:id')
  updateRoom(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @GetUser() user: User
  ) {
    return this.roomsService.updateRoom(id, updateRoomDto, user);
  }

  @Patch('/:roomId/:lessonId')
  updateRoomTeacher(
    @Param('roomId') roomId: string,
    @Param('lessonId') lessonId: string,
    @GetUser() user: User
  ) {
    return this.roomsService.updateRoomTeacher(roomId, lessonId, user);
  }
}
