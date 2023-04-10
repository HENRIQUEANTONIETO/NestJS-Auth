import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/app/users/users.entity';

@Injectable()
@ValidatorConstraint({ name: 'IsEmailAlreadyExist', async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return !user;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Email ${args.value} já está em uso.`;
  }
}
