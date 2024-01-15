import { Injectable } from '@nestjs/common';
import { OWNER_EMAIL, db } from 'src/main';
import { User } from 'src/shared/models/user';

@Injectable()
export class UsersService {
  async createUser(userId: string, name: string, email: string): Promise<string> {
    // オーナー用
    if (email === OWNER_EMAIL) {
      await db
        .collection('users')
        .doc(userId)
        .set({ name, email, role: 'owner' } as User);
      return 'オーナーログイン成功';
    }

    // 閲覧者用
    await db
      .collection('users')
      .doc(userId)
      .set({ name, email, role: 'reader' } as User);
    return '閲覧者ログイン成功';
  }

  async getUser(userId: string) {
    const snapshots = await db.collection('users').doc(userId).get();

    return snapshots.data();
  }
}
