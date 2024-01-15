import { Injectable } from '@nestjs/common';
import { db } from 'src/main';

@Injectable()
export class LikesService {
  async getLikesCount(blogId: string) {
    const snapshot = await db.collection('blogs').doc(blogId).collection('likes').count().get();

    const count = snapshot.data().count;

    return count;
  }
}
