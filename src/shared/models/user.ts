import { Blog } from './blogs';

export type User = {
  id: string;
  role: 'owner' | 'reader';
  blog: Blog[];
};
