import { LessonField } from '../lesson.enum';

export class CreateLessonDto {
  title: string;
  classNumber: number;
  field: LessonField;
}
