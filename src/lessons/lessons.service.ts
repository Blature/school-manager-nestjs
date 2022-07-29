import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { GetFilterDto } from './dto/get-filter.dto';
import { Lesson } from './lesson.entity';
import { LessonsRepository } from './lessons.repository';

@Injectable()
export class LessonsService {
  private logger = new Logger('LessonsService');
  constructor(
    @InjectRepository(LessonsRepository)
    private lessonRepository: LessonsRepository
  ) {}

  createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonRepository.createLesson(createLessonDto);
  }

  getLessons(getFilterDto: GetFilterDto): Promise<Lesson[]> {
    return this.lessonRepository.getLessons(getFilterDto);
  }
}
