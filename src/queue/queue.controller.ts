import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MailService } from 'src/mail/mail.service';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private mailService: MailService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/job/:id')
  async checkJobProgress(@Param() params) {
    this.mailService.sendMail('sh.elfadaly@gmail.com', 'upload-grades', ``, {
      url: '',
    });

    return this.queueService.checkJobProgress(params.id);
  }
}
