export type User = {
  id: string;
  role: 'owner' | 'reader';
  name: string;
  email: string;
};
