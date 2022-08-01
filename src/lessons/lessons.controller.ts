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
import { CreateLessonDto } from './dto/create-lesson.dto';
import { GetFilterDto } from './dto/get-filter.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './lesson.entity';
import { LessonsService } from './lessons.service';

@Controller('lessons')
@UseGuards(AuthGuard())
export class LessonsController {
  private logger = new Logger('LessonsController');
  constructor(private lessonsService: LessonsService) {}

  @Post()
  createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @GetUser() user: User
  ): Promise<Lesson> {
    return this.lessonsService.createLesson(createLessonDto, user);
  }

  @Get()
  getLessons(
    @Query() getFilterDto: GetFilterDto,
    @GetUser() user: User
  ): Promise<Lesson[]> {
    return this.lessonsService.getLessons(getFilterDto, user);
  }

  @Get('/:id')
  getLessonById(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Lesson> {
    return this.lessonsService.getLessonById(id, user);
  }

  @Delete('/:id')
  deleteLesson(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.lessonsService.deleteLesson(id, user);
  }

  @Put('/:id')
  updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @GetUser() user: User
  ) {
    return this.lessonsService.updateLesson(id, updateLessonDto, user);
  }

  @Patch('/:userId/:lessonId')
  updateLessonTeacher(
    @Param('userId') userId: string,
    @Param('lessonId') lessonId: string,
    @GetUser() user: User
  ) {
    return this.lessonsService.updateLessonTeacher(userId, lessonId, user);
  }
}
