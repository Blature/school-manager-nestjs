import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsController } from './lessons.controller';
import { LessonsRepository } from './lessons.repository';
import { LessonsService } from './lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([LessonsRepository])],
  providers: [LessonsService],
  controllers: [LessonsController],
})
export class LessonsModule {}
