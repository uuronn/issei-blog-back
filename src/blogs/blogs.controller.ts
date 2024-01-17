import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDTO } from './blogs.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Post()
  async createBlog(@Body() body: BlogDTO) {
    const { title, content } = body;
    this.blogsService.createBlog({ title, content, likes: [] });

    return { title, content };
  }

  @Post(':blogId')
  async addLikeBlog(@Param('blogId') blogId: string, @Body() body) {
    const { userId } = body;

    return this.blogsService.addLikeBlog(blogId, userId);
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
