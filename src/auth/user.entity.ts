import { Lesson } from 'src/lessons/lesson.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoll } from './user-roll.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'enum', default: UserRoll.Student, enum: UserRoll })
  roll: UserRoll;

  @Column()
  date: string;

  @OneToMany((_type) => Lesson, (lesson) => lesson.user, { eager: true })
  lessons: Lesson[];
}
