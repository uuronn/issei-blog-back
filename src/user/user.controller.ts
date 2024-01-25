import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { v4 as uuid } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    const res = await this.userService.findAll();
    return res;
  }

  @Post()
  create() {
    this.userService.create({ id: uuid(), name: 'よし', password: 'たか', email: '' });
  }
}
