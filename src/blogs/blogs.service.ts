import { Injectable } from '@nestjs/common';
import { db } from 'src/main';
import { Blog } from 'src/shared/models/blogs';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [];

  async createBlog(blog: Blog) {
    await db.collection('blogs').add(blog);
  }

  async getBlog(blogId: string) {
    const doc = await db.collection('blogs').doc(blogId).get();

    return doc.data();
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
