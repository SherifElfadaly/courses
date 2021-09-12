import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { BullModule } from '@nestjs/bull';
import { ImportGradesProcessor } from './import-grades.processor';
import { ScoresModule } from 'src/scores/scores.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    StudentsModule,
    ScoresModule,
    TypeOrmModule.forFeature([Course]),
    BullModule.registerQueue({
      name: 'import-grades'
    }),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, ImportGradesProcessor],
})
export class CoursesModule {}
