import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [StudentsModule, TypeOrmModule.forFeature([Score])],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [ScoresService],
})
export class ScoresModule {}
