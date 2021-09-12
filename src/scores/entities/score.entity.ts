import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'scores' })
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @Column()
  pass: boolean;

  @Column()
  course_id: number;

  @Column()
  student_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  async setPass(pass: boolean) {
    this.pass = this.grade > 50;
  }

  @ManyToOne(() => Course, (course) => course.scores)
  course: Course;

  @ManyToOne(() => Student, (student) => student.scores)
  student: Student;
}
