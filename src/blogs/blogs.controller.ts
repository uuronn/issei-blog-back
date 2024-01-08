import { Controller, Get, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Post()
  async createBlog() {
    this.blogsService.createBlog();
  }

  @Get()
  async getBlogs() {
    return this.blogsService.getBlogs();
  }

  @Get(':blogId')
  async getBlog(@Param('blogId') blogId: string) {
    return this.blogsService.getBlog(blogId);
  }
}
