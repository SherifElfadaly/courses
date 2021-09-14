import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('import-grades') private importGradesQueue: Queue) {}

  async checkJobProgress(jobId) {
    const job = await this.importGradesQueue.getJob(jobId);
    if (!job) {
      throw new NotFoundException();
    }

    return {
      progress: job.progress(),
      completed: await job.isCompleted(),
      failed: await job.isFailed(),
      failedReason: job.failedReason,
      errors: job.data.errors || [],
    };
  }
}
