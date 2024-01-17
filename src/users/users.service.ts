import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { OWNER_EMAIL, db } from 'src/main';
import { User } from 'src/shared/models/user';

@Injectable()
export class UsersService {
  async createUser(userId: string): Promise<string> {
    const user = await getAuth().getUser(userId);

    // ユーダーデータ作成
    if (user.email === OWNER_EMAIL) {
      await db
        .collection('users')
        .doc(userId)
        .set({
          name: user.displayName,
          email: user.email,
          role: user.email === OWNER_EMAIL ? 'owner' : 'reader',
        } as User);
      return 'ログイン成功';
    }
  }

  async getUser(userId: string) {
    const snapshots = await db.collection('users').doc(userId).get();

    return snapshots.data();
  }
}
