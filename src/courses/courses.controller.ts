import {
  BadRequestException,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CoursesService } from './courses.service';
import { UploadGradesDto } from './dto/upload-grades.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:id/upload/grades')
  @UseInterceptors(
    FileInterceptor('sheet', {
      fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(xlsx|xls)$/)) {
          return cb(new BadRequestException('Extension not allowed'), false);
        }

        cb(null, true);
      },
    }),
  )
  async uploadGrades(
    @UploadedFile() sheet: Express.Multer.File,
    @Body() uploadGradesDto: UploadGradesDto,
    @Param() params,
    @Request() req,
  ) {
    return this.coursesService.importGrades(
      params.id,
      sheet,
      req.user.id,
      uploadGradesDto.email,
    );
  }
}
