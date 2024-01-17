import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { ValidationPipe } from '@nestjs/common';

let db: Firestore;
let AUTHORIZATION_KEY: string;
let OWNER_EMAIL: string;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  });

  db = getFirestore();

  await app.listen(8000);

  console.log('http://localhost:8000');
}

bootstrap();

export { db, AUTHORIZATION_KEY, OWNER_EMAIL };
