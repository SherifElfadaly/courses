import { Score } from "src/scores/entities/score.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'students'})
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column('uuid')
    code:string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @DeleteDateColumn()
    deleted_at:Date;

    @OneToMany(() => Score, score => score.student)
    scores: Score;
}
