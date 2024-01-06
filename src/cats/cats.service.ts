import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{ name: 'test', age: 4, breed: 'ddd' }];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
