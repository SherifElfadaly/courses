import { define } from "typeorm-seeding";
import Faker from 'faker';
import { Student } from "../entities/student.entity";

define(Student, (faker: typeof Faker) => {
    const student = new Student();
    student.name = faker.name.firstName() + ' ' + faker.name.lastName();

    return student;
});