import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/job/:id')
  async checkJobProgress(@Param() params) {
    return this.queueService.checkJobProgress(params.id);
  }
}
