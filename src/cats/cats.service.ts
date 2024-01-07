import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/cat.interface';
import { db } from 'src/main';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{ name: 'test', age: 4, breed: 'ddd' }];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  async findAll(): Promise<Cat[]> {
    const snapshots = await db.collection('test').get();

    const test = snapshots.docs.map((doc) => {
      return doc.data();
    });

    console.log('aaa', test);

    return this.cats;
  }
}
