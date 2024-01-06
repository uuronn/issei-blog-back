import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cat } from 'src/cats/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
