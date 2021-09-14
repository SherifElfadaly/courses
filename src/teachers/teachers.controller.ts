import {
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Teacher } from './entities/teacher.entity';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Teacher>> {
    return this.teachersService.findAll({ page, limit });
  }
}
