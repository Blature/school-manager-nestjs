import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LessonField } from 'src/lessons/lesson.enum';

export class GetFilterRoomDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(LessonField)
  field?: LessonField;
}
