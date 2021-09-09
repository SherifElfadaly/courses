import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScoresModule } from './scores/scores.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (configService.get('database')),
      inject: [ConfigService],
    }),
    UsersModule,
    TeachersModule,
    StudentsModule,
    CoursesModule,
    ScoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
