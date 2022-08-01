import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  createLesson(createLessonDto: CreateLessonDto, user: User): Promise<Lesson> {
    return this.lessonRepository.createLesson(createLessonDto, user);
  }

  getLessons(getFilterDto: GetFilterDto, user: User): Promise<Lesson[]> {
    return this.lessonRepository.getLessons(getFilterDto, user);
  }

  async getLessonById(id: string, user: User): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id, user } });

    if (!lesson) {
      this.logger.error(`We cant Find Lesson with ID: ${id}`);
      throw new NotFoundException(
        `We cant Find your Lesson With this Id : ${id}`
      );
    }
    return lesson;
  }

  async deleteLesson(id: string, user: User): Promise<void> {
    if (user.roll === 'HeadMaster') {
      await this.getLessonById(id, user);
      try {
        this.logger.verbose(`a Lesson With ID: ${id} has been deleted !`);
        await this.lessonRepository.delete({ id, user });
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

  async updateLesson(
    id: string,
    updateLessonDto: UpdateLessonDto,
    user: User
  ): Promise<Lesson> {
    const lesson = await this.getLessonById(id, user);
    const { title, field, classNumber } = updateLessonDto;

    lesson.title = title;
    lesson.classNumber = classNumber;
    lesson.field = field;

    await this.lessonRepository.save(lesson);
    return lesson;
  }
}
