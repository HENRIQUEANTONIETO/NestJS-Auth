import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { IsEmailAlreadyExistConstraint } from './validations/isEmailAlreadyExist.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, IsEmailAlreadyExistConstraint],
  exports: [UsersService]
})
export class UsersModule {}
