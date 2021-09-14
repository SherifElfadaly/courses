import { Processor, Process } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { MailService } from 'src/mail/mail.service';
import { ScoresService } from 'src/scores/scores.service';

@Processor('import-grades')
export class ImportGradesProcessor {
  constructor(
    private scoresService: ScoresService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  @Process()
  async import(job: Job<unknown>) {
    await this.scoresService.importGrades(
      job.data['course'].id,
      job.data['grades'],
      job,
    );

    if (job.data['email']) {
      const teacher = job.data['teacher'];
      const courseCode = job.data['course'].code;
      const url = `${this.configService.get<string>(
        'app.url',
      )}/scores?course_id=${courseCode}`;
      const data = { url };

      this.mailService.sendMail(
        job.data['email'],
        'upload-grades',
        `${courseCode} results are published by ${teacher.name}`,
        data,
      );
    }
  }
}
