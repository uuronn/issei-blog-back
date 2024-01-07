import { Injectable } from '@nestjs/common';
import { db } from 'src/main';
import { Blog } from 'src/shared/models/blogs';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [];

  async createBlog() {
    await db.collection('blogs').add({
      title: 'Tokyo',
      content: 'Japan',
    } as Blog);
  }

  async getBlogs() {
    const snapshots = await db.collection('blogs').get();

    const blogs = snapshots.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Blog,
    );

    this.blogs = blogs;

    return this.blogs;
  }
}
