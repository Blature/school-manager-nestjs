import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LessonField } from 'src/lessons/lesson.enum';

export class UpdateRoomDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  classNumber?: string;

  @IsEnum(LessonField)
  field?: LessonField;
}
