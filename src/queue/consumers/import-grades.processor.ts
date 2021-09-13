import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { ScoresService } from 'src/scores/scores.service';

@Processor('import-grades')
export class ImportGradesProcessor {
  constructor(private scoresService: ScoresService) {}

  @Process()
  async import(job: Job<unknown>) {
    await this.scoresService.importGrades(
      job.data['courseId'],
      job.data['grades'],
      job,
    );

    if (job.data['email']) {
    }
  }
}
