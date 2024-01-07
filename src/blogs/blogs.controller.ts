import { Controller, Get, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Post()
  async Post() {
    this.blogsService.createBlog();
  }

  @Get()
  async getBlogs() {
    return this.blogsService.getBlogs();
  }
}
