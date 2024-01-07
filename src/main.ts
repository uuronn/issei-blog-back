import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

let db: Firestore;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configの読み込み
  const configService: ConfigService = app.get(ConfigService);

  // Configから読み込んだ値を指定してfirebase-admin用のConfigオブジェクトを作成
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  initializeApp({
    credential: cert(adminConfig),
  });

  db = getFirestore();

  await app.listen(3000);

  console.log('http://localhost:3000');
}

bootstrap();

export { db };
