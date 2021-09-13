import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [QueueModule, TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
