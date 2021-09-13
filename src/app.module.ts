import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScoresModule } from './scores/scores.module';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import cacheConfig from './config/cache.config';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, authConfig, cacheConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('cache'),
      inject: [ConfigService],
    }),
    UsersModule,
    TeachersModule,
    StudentsModule,
    CoursesModule,
    ScoresModule,
    AuthModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
