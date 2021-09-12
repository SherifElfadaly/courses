import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Teacher } from '../entities/teacher.entity';

export default class CreateTeachersSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Teacher)().createMany(10);
  }
}
