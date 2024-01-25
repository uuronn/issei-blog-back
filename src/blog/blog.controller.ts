import { Body, Controller, Post } from '@nestjs/common';

import { BlogService } from './blog.service';
import { Blog } from './blog.entity';
import { v4 as uuid } from 'uuid';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  async createBlog(@Body() body: Blog) {
    const { title, content } = body;

    this.blogService.createBlog({ id: uuid(), title, content });

    return { title, content };
  }
}
