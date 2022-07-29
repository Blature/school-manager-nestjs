import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LessonField } from '../lesson.enum';

export class UpdateLessonDto {
  @IsString()
  title?: string;

  @IsString()
  classNumber?: string;

  @IsEnum(LessonField)
  field?: LessonField;
}
