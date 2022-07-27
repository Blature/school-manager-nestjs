import { Logger } from '@nestjs/common';
import { title } from 'process';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './lesson.entity';
import { LessonField } from './lesson.enum';

@EntityRepository(Lesson)
export class LessonsRepository extends Repository<Lesson> {
  private logger = new Logger('LessonRepository');
  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const { title, classNumber, field } = createLessonDto;
    const lesson = this.create({
      title,
      classNumber,
      field,
      date: Date(),
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
}
