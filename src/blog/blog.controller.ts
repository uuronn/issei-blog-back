import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Get(':blogId')
  async getBlog(@Param('blogId') blogId: string) {
    return await this.blogService.getBlog(blogId);
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
