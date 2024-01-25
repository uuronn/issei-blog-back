import { Body, Controller, Get, Post } from '@nestjs/common';

import { BlogService } from './blog.service';
import { Blog } from './blog.entity';
import { v4 as uuid } from 'uuid';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getBlogs() {
    return await this.blogService.getBlogs();
  }

  @Post()
  async createBlog(@Body() body: Blog) {
    const { title, content } = body;

    this.blogService.createBlog({
      id: uuid(),
      title,
      content,
      createdAt: new Date().toISOString(),
    });

    return { title, content };
  }
}
