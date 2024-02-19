import {
  Controller,
  Get,
  Param,
  // Get,
  // Param,
  Post,
  Req,
} from '@nestjs/common';

// import { v4 as uuid } from 'uuid';
import { LikeService } from './like.service';
import { Like } from './like.entity';
import { Request } from 'express';
// import { Blog } from 'src/blog/blog.entity';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  // @Get()
  // async getBlogs() {
  //   return await this.likeService.getBlogs();
  // }

  @Get(':blogId')
  async getLike(@Param('blogId') blogId: string) {
    return await this.likeService.getLike(blogId);
  }

  @Post()
  async addLike(@Req() req: Request) {
    const { blogId, id } = req.body as Like;

    const userAgent = req.headers['user-agent'];

    console.log('User-Agent', userAgent);

    this.likeService.addLike({
      id,
      blogId,
      userAgent,
    });

    // return { title, content };
  }
}
