import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LessonField } from '../lesson.enum';

export class GetFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(LessonField)
  field?: LessonField;
}
