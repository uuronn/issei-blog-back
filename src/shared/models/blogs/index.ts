import { Base } from '../base';

export type Blog = {
  title: string;
  content: string;
  likes: string[];
} & Base;
