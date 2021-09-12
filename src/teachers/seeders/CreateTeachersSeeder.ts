import { Factory, Seeder } from 'typeorm-seeding';
import { Teacher } from '../entities/teacher.entity';

export default class CreateTeachersSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Teacher)().createMany(10);
  }
}
