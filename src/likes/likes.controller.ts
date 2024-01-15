import { Body, Controller, Post } from '@nestjs/common';

import { LikesService } from './likes.service';
import { LikesCountDTO } from './likes.dto';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('count')
  async getLikesCount(@Body() body: LikesCountDTO) {
    const { blogId } = body;

    return this.likesService.getLikesCount(blogId);
  }
}
