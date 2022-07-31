import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsRepository } from './rooms.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomsRepository]), AuthModule],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
