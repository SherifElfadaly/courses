import { define } from "typeorm-seeding";
import Faker from 'faker';
import { User } from "../entities/user.entity";

define(User, (faker: typeof Faker) => {
    const user = new User();
    user.email = faker.internet.email();
    user.password = '123456';

    return user;
});