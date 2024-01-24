import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    console.log('this', this.usersRepository.find());
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create({ id, firstName, lastName, isActive }: User): Promise<User | void> {
    console.log('aa', UUID);

    const res = this.usersRepository.create({ id, firstName, lastName, isActive });

    await this.usersRepository.save(res);

    console.log('res', res);
    return;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
