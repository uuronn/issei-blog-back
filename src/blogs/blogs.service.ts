import { Injectable } from '@nestjs/common';
import { db } from 'src/main';
import { getServerTimestamp } from 'src/shared/firebase-admin/firestore';
import { Blog } from 'src/shared/models/blogs';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [];

  async createBlog(blog: Blog) {
    const at = getServerTimestamp();

    await db.collection('blogs').add({ ...blog, createdAt: at } as Blog);
  }

  async addLikeBlog(blogId: string, userId: string) {
    const doc = await db.collection('blogs').doc(blogId).get();

    const prevLikes: string[] = doc.data().likes;

    const newLikes = [...prevLikes, userId];

    await db.collection('blogs').doc(blogId).update({ likes: newLikes });

    const newDoc = await db.collection('blogs').doc(blogId).get();

    const count = newDoc.data().likes.length;

    return count;
  }

  async getBlog(blogId: string) {
    const doc = await db.collection('blogs').doc(blogId).get();

    return doc.data();
  }

  async getBlogs() {
    const snapshots = await db.collection('blogs').get();

    const blogs = snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Blog);

    this.blogs = blogs;

    return this.blogs;
  }
}
