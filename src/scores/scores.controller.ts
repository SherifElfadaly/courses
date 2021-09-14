import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Score } from './entities/score.entity';

@Controller('scores')
@ApiTags('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  @ApiQuery({ name: 'course_id', type: String, required: false })
  @ApiQuery({ name: 'student_id', type: String, required: false })
  findAll(
    @Query() query,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Score>> {
    return this.scoresService.findAll({ page, limit }, query);
  }
}
