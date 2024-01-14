import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: UserDTO) {
    const { userId } = body;

    this.usersService.createUser(userId);
  }

  @Get()
  async getUser(@Body() body: UserDTO) {
    const { userId } = body;

    return this.usersService.getUser(userId);
  }
}
