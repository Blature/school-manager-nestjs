import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { GetFilterDto } from './dto/get-filter.dto';
import { Lesson } from './lesson.entity';

@EntityRepository(Lesson)
export class LessonsRepository extends Repository<Lesson> {
  private logger = new Logger('LessonRepository');
  async createLesson(
    createLessonDto: CreateLessonDto,
    user: User
  ): Promise<Lesson> {
    
    const { title, classNumber, field } = createLessonDto;
    const lesson = this.create({
      title,
      classNumber,
      field,
      date: Date(),
      user,
    });
    try {
      await this.save(lesson);
      this.logger.verbose(
        `a Lesson with Title: ${lesson.title} and Field: ${lesson.field} created !`
      );
      return lesson;
    } catch (err) {
      this.logger.error(`We got An Error ${err.message}`);
    }
  }

  async getLessons(getFilterDto: GetFilterDto, user: User): Promise<Lesson[]> {
    const { search, field } = getFilterDto;
    const query = this.createQueryBuilder('lesson');

    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER (lesson.title) LIKE LOWER (:search) OR LOWER (lesson.classNumber) LIKE LOWER (:search))',
        { search: `%${search}%` }
      );
    }

    if (field) {
      query.andWhere('lesson.field = :field', { field });
    }
    try {
      const lesson = await query.getMany();
      this.logger.verbose(
        `Search done! filters: ${JSON.stringify(getFilterDto)}`
      );
      return lesson;
    } catch (err) {
      this.logger.error(
        `someone try to search with this filters : ${JSON.stringify(
          getFilterDto
        )} and we got an error ${err.message}`
      );
      throw new InternalServerErrorException();
    }
  }
}
