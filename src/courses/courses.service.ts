import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as XLSX from 'xlsx'

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private courseRepository,
        @InjectQueue('import-grades') private importGradesQueue: Queue
    ) { }

    async importGrades(courseId: number, sheet: any, email?: string): Promise<any> {
        const workbook = XLSX.read(sheet.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const grades = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const job = await this.importGradesQueue.add({ courseId, grades, email });

        return { job_id: job.id };
    }
}
