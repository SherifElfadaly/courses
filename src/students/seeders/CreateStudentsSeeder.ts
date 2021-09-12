import { Factory, Seeder } from 'typeorm-seeding';
import { Student } from '../entities/student.entity';

export default class CreateStudentsSeeder implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Student)().createMany(10);
  }
}
