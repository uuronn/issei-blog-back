import { FieldValue, Timestamp } from 'firebase-admin/firestore';

export const getServerTimestamp = () => FieldValue.serverTimestamp() as Timestamp;
