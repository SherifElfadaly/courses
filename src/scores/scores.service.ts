import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Student } from 'src/students/entities/student.entity';
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

  findAll(conditions?: Array<string | number>): Promise<Score[]> {
    const where = this.constructWhereConditionsArray(conditions);

    return this.scoresRepository.find({
      relations: ['course', 'student'],
      where: where,
    });
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
    const errors = [];
    const imported = {};
    for (let index = 0; index < scores.length; index++) {
      const grade = scores[index];
      const student = await this.studentsService.findByCode(grade.id);
      const error = this.getGradeError(grade.grade, student, imported, index);

      if (error) {
        errors.push(error);
      } else {
        this.create({
          course_id: couseId,
          student_id: student.id,
          grade: grade.grade,
        });

        imported[student.id] = grade;
      }

      if (job) {
        job.progress(((index + 1) / scores.length) * 100);
      }
    }

    if (errors.length) {
      if (job) {
        job.data.errors = errors;
        await job.update(job.data);
      }
      throw Error('There was some errors');
    }
  }

  private getGradeError(
    grade: number,
    student: Student,
    imported: unknown,
    index: number,
  ) {
    if (!student) {
      return `Student at line ${index + 1} doesn't exist`;
    }

    if (grade < 0 || grade > 100) {
      return `Invalid grade at line ${index + 1}`;
    }

    if (imported[student.id]) {
      return `Duplicate student id at line ${index + 1}`;
    }

    return false;
  }

  private constructWhereConditionsArray(conditions: Array<string | number>) {
    const where = {};
    for (const key in conditions) {
      if (Object.prototype.hasOwnProperty.call(conditions, key)) {
        const element = conditions[key];
        switch (key) {
          case 'course_id':
            where['course'] = { code: element };
            break;
          case 'student_id':
            where['student'] = { code: element };
            break;

          default:
            break;
        }
      }
    }

    return where;
  }
}
