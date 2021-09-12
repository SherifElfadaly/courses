import { Factory, Seeder } from 'typeorm-seeding';
import { Course } from '../entities/course.entity';

export default class CreateCoursesSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Course)().createMany(10);
  }
}
