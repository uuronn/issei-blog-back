import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  // getBlogs(): Promise<Blog[] | null> {
  //   return this.blogRepository.find();
  // }

  getLike(blogId: string): Promise<Like | null> {
    return this.likeRepository.findOneBy({ blogId });
  }

  async addLike(body: Like) {
    const { blogId, userAgent } = body;

    const res = this.likeRepository.create({ blogId, userAgent });

    await this.likeRepository.save(res);

    return;
  }
}
