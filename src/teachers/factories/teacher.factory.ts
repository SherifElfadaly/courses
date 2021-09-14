import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';
import { Teacher } from '../entities/teacher.entity';
import { User } from '../../users/entities/user.entity';

define(Teacher, (faker: typeof Faker) => {
  const teacher = new Teacher();
  teacher.name = faker.name.firstName() + ' ' + faker.name.lastName();

  teacher.user = factory(User)() as any;

  return teacher;
});
