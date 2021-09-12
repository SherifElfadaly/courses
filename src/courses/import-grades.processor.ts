import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ScoresService } from 'src/scores/scores.service';
import { StudentsService } from 'src/students/students.service';

@Processor('import-grades')
export class ImportGradesProcessor {
    constructor(
        private scoresService: ScoresService,
        private studentsService: StudentsService
    ) { }

    private readonly logger = new Logger(ImportGradesProcessor.name);

    @Process()
    async import(job: Job<unknown>) {
        this.logger.debug('Start importing...');
        for (const grade of job.data['grades']) {
            const student = await this.studentsService.findByCode(grade.id);
            this.scoresService.create({
                course_id: job.data['courseId'],
                student_id: student.id,
                grade: grade.grade,
            });
        }
        this.logger.debug('Importing completed');

        return {};
    }
}