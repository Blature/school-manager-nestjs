import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LessonField } from './lesson.enum';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  classNumber: number;

  @Column('enum')
  field: LessonField;

  @Column()
  date: string;
}
