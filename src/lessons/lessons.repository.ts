import { title } from 'process';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './lesson.entity';
import { LessonField } from './lesson.enum';

@EntityRepository(Lesson)
export class LessonsRepository extends Repository<Lesson> {
  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const { title, classNumber } = createLessonDto;
    const lesson = this.create({
      title,
      classNumber,
      field: LessonField.default,
      date: Date(),
    });
    await this.save(lesson);
    return lesson;
  }
}
