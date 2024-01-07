import { Timestamp } from 'firebase-admin/firestore';

export type Base = {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
