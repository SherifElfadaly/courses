import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { Course } from '../entities/course.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

define(Course, (faker: typeof Faker) => {
  const course = new Course();
  course.name = faker.lorem.word();

  course.teacher = factory(Teacher)() as any;

  return course;
});
