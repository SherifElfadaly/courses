import { Controller, Get, Query } from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  findAll(@Query() query) {
    return this.scoresService.findAll(query);
  }
}
