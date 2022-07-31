import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { LessonField } from 'src/lessons/lesson.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  classNumber: string;

  @Column({ type: 'enum', default: LessonField.default, enum: LessonField })
  field: LessonField;

  @Column()
  date: string;

  @Exclude({ toPlainOnly: true })
  @ManyToOne((_type) => User, (user) => user.lessons, { eager: false })
  user: User;
}
