import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async createUser(@Body() body: UserDTO): Promise<string> {
    const { userId } = body;

    return this.usersService.createUser(userId);
  }

  // @Get()
  // async getUser(@Query('userId') userId: string) {
  //   return this.usersService.getUser(userId);
  // }
}
