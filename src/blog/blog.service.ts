import { Injectable } from '@nestjs/common';
import { Blog } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async createBlog(body: Blog) {
    const { id, title, content } = body;

    const res = this.blogRepository.create({ id, title, content });

    await this.blogRepository.save(res);

    console.log('res', res);

    return;
  }
}
