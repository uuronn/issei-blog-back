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

  getBlogs(): Promise<Blog[] | null> {
    return this.blogRepository.find();
  }

  getBlog(id: string): Promise<Blog | null> {
    return this.blogRepository.findOneBy({ id });
  }

  async createBlog(body: Blog) {
    const { id, title, content, createdAt } = body;

    const res = this.blogRepository.create({ id, title, content, createdAt });

    await this.blogRepository.save(res);

    console.log('res', res);

    return;
  }
}
