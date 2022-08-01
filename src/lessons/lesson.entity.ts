import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Exclude({ toPlainOnly: true })
  @ManyToOne((_type) => User, (user) => user.lessons, { eager: false })
  user: User;

  @Column({ default: '' })
  teacher: string;
}
