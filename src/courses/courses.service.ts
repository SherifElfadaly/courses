import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as XLSX from 'xlsx';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository,
    private userService: UsersService,
    @InjectQueue('import-grades') private importGradesQueue: Queue,
  ) {}

  async find(id: number): Promise<Course | undefined> {
    return this.courseRepository.findOne(id);
  }

  async importGrades(
    courseId: number,
    sheet: any,
    userId: number,
    email?: string,
  ): Promise<any> {
    const user = await this.userService.find(userId);
    const teacher = await user.teacher;
    const course = await this.find(courseId);
    if (!course) {
      throw new NotFoundException('course not found');
    }
    const workbook = XLSX.read(sheet.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const grades = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const job = await this.importGradesQueue.add({
      course,
      grades,
      email,
      teacher,
    });

    return { job_id: job.id };
  }
}
