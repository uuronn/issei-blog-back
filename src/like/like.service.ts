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

  // getBlog(id: string): Promise<Blog | null> {
  //   return this.blogRepository.findOneBy({ id });
  // }

  async addLike(body: Like) {
    const { blogId, userIp } = body;

    const res = this.likeRepository.create({ blogId, userIp });

    await this.likeRepository.save(res);

    return;
  }
}
