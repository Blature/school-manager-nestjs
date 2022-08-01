import { LessonField } from '../lesson.enum';

export class CreateLessonDto {
  title: string;
  classNumber: string;
  field: LessonField;
  teacher?: string = '';
}
