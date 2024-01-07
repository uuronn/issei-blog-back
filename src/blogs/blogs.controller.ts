import { Controller, Get } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  async getBlogs() {
    return this.blogsService.getBlogs();
  }
}
