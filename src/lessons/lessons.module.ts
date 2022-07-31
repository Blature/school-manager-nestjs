import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LessonsController } from './lessons.controller';
import { LessonsRepository } from './lessons.repository';
import { LessonsService } from './lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([LessonsRepository]), AuthModule],
  providers: [LessonsService],
  controllers: [LessonsController],
})
export class LessonsModule {}
