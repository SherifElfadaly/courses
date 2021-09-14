import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from '../mail/mail.module';
import { ScoresModule } from '../scores/scores.module';
import { ImportGradesProcessor } from './consumers/import-grades.processor';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    ScoresModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('cache'),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'import-grades',
    }),
  ],
  providers: [ImportGradesProcessor, QueueService],
  exports: [ImportGradesProcessor, BullModule],
  controllers: [QueueController],
})
export class QueueModule {}
