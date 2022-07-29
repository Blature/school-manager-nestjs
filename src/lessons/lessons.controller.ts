import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { GetFilterDto } from './dto/get-filter.dto';
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
}
