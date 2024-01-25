import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create({ id, name, password, email }: User): Promise<User | void> {
    const res = this.usersRepository.create({ id, name, password, email });

    await this.usersRepository.save(res);

    return;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
