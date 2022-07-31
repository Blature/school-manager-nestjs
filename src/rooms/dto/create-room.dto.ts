import { LessonField } from 'src/lessons/lesson.enum';

export class CreateRoomDto {
  name: string;
  description: string;
  classNumber: string;
  field: LessonField;
}
