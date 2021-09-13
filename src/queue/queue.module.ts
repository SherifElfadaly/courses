import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScoresModule } from 'src/scores/scores.module';
import { ImportGradesProcessor } from './consumers/import-grades.processor';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';

@Module({
  imports: [
    ScoresModule,
    BullModule.registerQueue({
      name: 'import-grades',
    }),
  ],
  providers: [ImportGradesProcessor, QueueService],
  exports: [ImportGradesProcessor, BullModule],
  controllers: [QueueController],
})
export class QueueModule {}
