import { Course } from "src/courses/entities/course.entity";
import { Student } from "src/students/entities/student.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'scores'})
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grade: number;

    @Column()
    pass: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Course, course => course.scores)
    course: Course;

    @ManyToOne(() => Student, student => student.scores)
    student: Student;
}
