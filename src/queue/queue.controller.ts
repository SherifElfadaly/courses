import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MailService } from '../mail/mail.service';
import { QueueService } from './queue.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('queue')
@ApiTags('queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private mailService: MailService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/job/:id')
  @ApiBearerAuth()
  async checkJobProgress(@Param('id') jobId: number) {
    return this.queueService.checkJobProgress(jobId);
  }
}
