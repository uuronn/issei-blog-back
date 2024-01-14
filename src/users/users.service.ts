import { Injectable } from '@nestjs/common';
import { db } from 'src/main';
import { User } from 'src/shared/models/user';

@Injectable()
export class UsersService {
  async createUser(userId: string): Promise<void> {
    console.log('userId', userId);

    await db.collection('users').add({ id: userId, role: 'reader', blog: [] } as User);
  }

  async getUser(userId: string) {
    console.log('user', userId);

    const snapshots = await db.collection('users').doc(userId).get();

    return snapshots;
  }
}
