import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsRepository } from './rooms.repository';
import { AuthModule } from 'src/auth/auth.module';
import { LessonsRepository } from 'src/lessons/lessons.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomsRepository, LessonsRepository]),
    AuthModule,
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
