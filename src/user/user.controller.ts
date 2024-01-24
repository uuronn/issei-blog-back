import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    const res = await this.userService.findAll();
    console.log('res', res);
    return res;
  }

  @Post()
  create() {
    this.userService.create({ id: 12, firstName: 'よし', lastName: 'たか', isActive: false });
  }
}
