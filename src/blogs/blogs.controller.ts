import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDTO } from './blogs.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Post()
  async createBlog(@Body() blogDTO: BlogDTO) {
    this.blogsService.createBlog(blogDTO);
    return blogDTO;
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
