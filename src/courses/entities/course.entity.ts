import { Score } from 'src/scores/entities/score.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  async setCode(code: string) {
    this.code = code || this.name.substring(0,3).toUpperCase() + new Date().getFullYear();
  }

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher: Teacher;

  @OneToMany(() => Score, (score) => score.course)
  scores: Score;
}
