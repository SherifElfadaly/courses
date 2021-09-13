import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { StudentsService } from 'src/students/students.service';
import { Repository } from 'typeorm';
import { CreateScoreDto } from './dto/create-score.dto';
import { ImportGradesDto } from './dto/import-grades.dto';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
    private studentsService: StudentsService,
  ) {}

  findAll(): Promise<Score[]> {
    return this.scoresRepository.find();
  }

  create(scoreDto: CreateScoreDto): Promise<Score> {
    const score = this.scoresRepository.create(scoreDto);
    return this.scoresRepository.save(score);
  }

  async importGrades(
    couseId: number,
    scores: ImportGradesDto[],
    job?: Job,
  ): Promise<void> {
    for (let index = 0; index < scores.length; index++) {
      const grade = scores[index];
      const student = await this.studentsService.findByCode(grade.id);
      this.create({
        course_id: couseId,
        student_id: student.id,
        grade: grade.grade,
      });

      if (job) {
        job.progress(((index + 1) / scores.length) * 100);
      }
    }
  }
}
