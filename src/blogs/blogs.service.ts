import { Injectable } from '@nestjs/common';
import { database, db } from 'src/main';
import { getServerTimestamp } from 'src/shared/firebase-admin/firestore';
import { Blog } from 'src/shared/models/blogs';
import * as firebase from 'firebase-admin';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [];

  async createBlog(blog: Blog) {
    const at = getServerTimestamp();

    await db.collection('blogs').add({ ...blog, createdAt: at } as Blog);
  }

  async addLikeBlog(blogId: string, userId: string) {
    database.ref('.info/connected').on('value', function (snapshot) {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() == false) {
        return;
      }

      // If we are currently connected, then use the 'onDisconnect()'
      // method to add a set which will only trigger once this
      // client has disconnected by closing the app,
      // losing internet, or any other means.
      database
        .ref('test')
        .onDisconnect()
        .set({
          state: 'offline',
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        })
        .then(function () {
          // The promise returned from .onDisconnect().set() will
          // resolve as soon as the server acknowledges the onDisconnect()
          // request, NOT once we've actually disconnected:
          // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

          // We can now safely set ourselves as 'online' knowing that the
          // server will mark us as offline once we lose connection.
          database.ref('test').set({
            state: 'online',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
          });
        });
    });

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
