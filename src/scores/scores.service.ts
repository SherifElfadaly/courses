import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
  ) {}

  findAll(): Promise<Score[]> {
    return this.scoresRepository.find();
  }

  create(scoreDto: CreateScoreDto): Promise<Score> {
    const score = this.scoresRepository.create(scoreDto);
    return this.scoresRepository.save(score);
  }
}
