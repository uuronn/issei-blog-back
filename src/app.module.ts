import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { HelthCheckController } from './helthCheck/helthCheck.controller';
import { HelthCheckModule } from './helthCheck/helthCheck.module';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/blog.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Blog],
      synchronize: true,
    }),
    BlogsModule,
    UserModule,
    HelthCheckModule,
    BlogModule,
  ],
  controllers: [AppController, HelthCheckController],
  providers: [AppService],
})
export class AppModule {
  configure() {}
  constructor(private dataSource: DataSource) {}
}
