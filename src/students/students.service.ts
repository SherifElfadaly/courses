import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(options: IPaginationOptions): Promise<Pagination<Student>> {
    return paginate<Student>(this.studentRepository, options);
  }

  findByCode(code: string): Promise<Student | undefined> {
    return this.studentRepository.findOne({ where: { code: code } });
  }
}
