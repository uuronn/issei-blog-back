import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: UserDTO): Promise<string> {
    const { userId, name, email } = body;

    return this.usersService.createUser(userId, name, email);
  }

  @Get()
  async getUser(@Query('userId') userId: string) {
    return this.usersService.getUser(userId);
  }
}
