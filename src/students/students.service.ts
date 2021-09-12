import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private scoresRepository: Repository<Student>,
  ) {}

  async findByCode(code: string): Promise<Student | undefined> {
    return this.scoresRepository.findOne({ where: { code: code } });
  }
}
