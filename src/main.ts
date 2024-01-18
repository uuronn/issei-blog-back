import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { ValidationPipe } from '@nestjs/common';
import { Database, getDatabase } from 'firebase-admin/database';
import * as firebase from 'firebase-admin';
import { ExpressAdapter } from '@nestjs/platform-express';

let db: Firestore;
let database: Database;
let AUTHORIZATION_KEY: string;
let OWNER_EMAIL: string;

const server = new ExpressAdapter();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, server);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  // Configの読み込み
  const configService: ConfigService = app.get(ConfigService);

  AUTHORIZATION_KEY = configService.get<string>('AUTHORIZATION_KEY');
  OWNER_EMAIL = configService.get<string>('OWNER_EMAIL');

  // Configから読み込んだ値を指定してfirebase-admin用のConfigオブジェクトを作成
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  initializeApp({
    credential: cert(adminConfig),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  db = getFirestore();

  database = getDatabase();

  database.ref('.info/connected').on('value', function (snapshot) {
    // If we're not currently connected, don't do anything.
    if (snapshot.val() == false) {
      firebase
        .firestore()
        .doc('/status/' + 'uid')
        .set({
          state: 'offline',
          last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        });

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

        const userStatusFirestoreRef = firebase.firestore().doc('/status/' + 'uid');

        userStatusFirestoreRef.set({
          state: 'online',
          last_changed: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
  });

  await app.listen(8000);

  console.log('http://localhost:8000');
}

bootstrap();

export { db, database, AUTHORIZATION_KEY, OWNER_EMAIL };
