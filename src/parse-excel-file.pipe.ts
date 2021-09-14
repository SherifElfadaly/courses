import {
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ParseExcelFilePipe implements PipeTransform {
  transform(
    files: Express.Multer.File | Express.Multer.File[],
  ): Express.Multer.File | Express.Multer.File[] {
    if (files === undefined || files === null) {
      throw new UnprocessableEntityException(
        'Validation failed (file expected)',
      );
    }

    if (Array.isArray(files)) {
      throw new UnprocessableEntityException(
        'Validation failed (Single file only allowed)',
      );
    }

    if (!files.originalname.match(/\.(xlsx|xls)$/)) {
      throw new UnprocessableEntityException(
        'Validation failed (Extension not allowed)',
      );
    }

    return files;
  }
}
