import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParseExcelFilePipe } from '../parse-excel-file.pipe';
import { CoursesService } from './courses.service';
import { UploadGradesDto } from './dto/upload-grades.dto';
import { ApiBody, ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:id/upload/grades')
  @UseInterceptors(FileInterceptor('sheet'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    type: UploadGradesDto,
  })
  async uploadGrades(
    @UploadedFile(ParseExcelFilePipe) sheet: Express.Multer.File,
    @Body() uploadGradesDto: UploadGradesDto,
    @Param('id') courseId: number,
    @Request() req,
  ) {
    return this.coursesService.importGrades(
      courseId,
      sheet,
      req.user.id,
      uploadGradesDto.email,
    );
  }
}
