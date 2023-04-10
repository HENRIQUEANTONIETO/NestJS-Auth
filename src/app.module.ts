import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    TypeOrmModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
