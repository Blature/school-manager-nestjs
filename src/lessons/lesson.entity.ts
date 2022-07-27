import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LessonField } from './lesson.enum';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  classNumber: string;

  @Column({ type: 'enum', default: LessonField.default, enum: LessonField })
  field: LessonField;

  @Column()
  date: string;
}
