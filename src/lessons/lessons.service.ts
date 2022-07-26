import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { UsersRepository } from 'src/auth/users.repository';
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
    private lessonRepository: LessonsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) {}

  createLesson(createLessonDto: CreateLessonDto, user: User): Promise<Lesson> {
    return this.lessonRepository.createLesson(createLessonDto, user);
  }

  getLessons(getFilterDto: GetFilterDto, user: User): Promise<Lesson[]> {
    return this.lessonRepository.getLessons(getFilterDto, user);
  }

  async getLessonById(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

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
      await this.getLessonById(id);
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

  async updateLessonTeacher(
    userId: string,
    lessonId: string,
    user: User
  ): Promise<Lesson> {
    if (user.roll === 'HeadMaster' || user.roll === 'Teacher') {
      const char = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!char) {
        this.logger.error(`Cant Find User ID !`);
        throw new NotFoundException(`Cant Find User ID !`);
      } else {
        if ((await char).roll === 'HeadMaster') {
          this.logger.error(
            `You Do not have Permision to do this Only Teacher Roll Can be Teacher`
          );
          throw new InternalServerErrorException(
            `You Do not have Permision to do this`
          );
        } else {
          const lesson = await this.getLessonById(lessonId);

          lesson.teacher = userId;
          await this.lessonRepository.save(lesson);
          return lesson;
        }
      }
    } else {
      this.logger.error(`You Do not have Permision to do this`);
      throw new InternalServerErrorException(
        `You Do not have Permision to do this`
      );
    }
  }
}
