import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { GetFilterDto } from './dto/get-filter.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './lesson.entity';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  private logger = new Logger('LessonsController');
  constructor(private lessonsService: LessonsService) {}

  @Post()
  createLesson(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.createLesson(createLessonDto);
  }

  @Get()
  getLessons(@Query() getFilterDto: GetFilterDto): Promise<Lesson[]> {
    return this.lessonsService.getLessons(getFilterDto);
  }

  @Get('/:id')
  getLessonById(@Param('id') id: string): Promise<Lesson> {
    return this.lessonsService.getLessonById(id);
  }

  @Delete('/:id')
  deleteLesson(@Param('id') id: string): Promise<void> {
    return this.lessonsService.deleteLesson(id);
  }

  @Put('/:id')
  updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto
  ) {
    return this.lessonsService.updateLesson(id, updateLessonDto);
  }
}
