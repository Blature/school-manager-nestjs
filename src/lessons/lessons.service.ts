import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindRelationsNotFoundError } from 'typeorm';
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

  async getLessonById(id: string) {
    const lesson = await this.lessonRepository.findOne({ id });
    this.logger.verbose(`a Lesson with id ${id} was searched !`);

    if (!lesson) {
      this.logger.error(`We cant Find Lesson with ID: ${id}`);
      throw new NotFoundException(
        `We cant Find your Lesson With this Id : ${id}`
      );
    }
    return lesson;
  }
}
