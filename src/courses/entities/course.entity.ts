import { Score } from '../../scores/entities/score.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  getRepository,
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
  async setCode(code: string, char: string = '') {
    char = char ? char : this.name.substring(0, 3).toUpperCase();
    this.code = code || char + new Date().getFullYear();
    const codeExists = await getRepository(Course).count({ where: { code: this.code } });

    if (codeExists) {
      char = Math.random().toString(36).substring(2,5).toUpperCase();
      this.setCode('', char);
    }
  }

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher: Teacher;

  @OneToMany(() => Score, (score) => score.course)
  scores: Score;
}
