import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { GetFilterDto } from './dto/get-filter.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
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

  async getLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id });

    if (!lesson) {
      this.logger.error(`We cant Find Lesson with ID: ${id}`);
      throw new NotFoundException(
        `We cant Find your Lesson With this Id : ${id}`
      );
    }
    return lesson;
  }

  async deleteLesson(id: string): Promise<void> {
    await this.getLessonById(id);
    try {
      this.logger.verbose(`a Lesson With ID: ${id} has been deleted !`);
      await this.lessonRepository.delete(id);
    } catch (err) {
      this.logger.error(
        `Something went Wrong in deleting ${id} the error message : ${err.message}`
      );
      throw new InternalServerErrorException();
    }
  }

  async updateLesson(
    id: string,
    updateLessonDto: UpdateLessonDto
  ): Promise<Lesson> {
    const lesson = await this.getLessonById(id);
    const { title, field, classNumber } = updateLessonDto;

    lesson.title = title;
    lesson.classNumber = classNumber;
    lesson.field = field;

    await this.lessonRepository.save(lesson);
    return lesson;
  }
}
