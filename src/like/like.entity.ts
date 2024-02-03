import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blogId: string;

  @Column()
  userIp: string;
}
