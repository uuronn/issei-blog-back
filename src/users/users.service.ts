import { Injectable } from '@nestjs/common';
import { db } from 'src/main';
import { User } from 'src/shared/models/user';

@Injectable()
export class UsersService {
  async createUser(userId: string): Promise<void> {
    await db
      .collection('users')
      .doc(userId)
      .set({ role: 'reader', blog: [] } as User);
  }

  async getUser(userId: string) {
    const snapshots = await db.collection('users').doc(userId).get();

    return snapshots.data();
  }
}
