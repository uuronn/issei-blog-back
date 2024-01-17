import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const decodedIdToken = await getAuth().verifyIdToken(req.headers.authorization.substring(7));

      if (!decodedIdToken.uid) {
        throw new Error('Not Permission Error.');
      }

      req.body.userId = decodedIdToken.uid;

      next();
    } catch (err: any) {
      console.error('ERROR', `💥💥💥authMiddleware💥💥💥`);
      console.error(err.message);
      res.status(404).end();
    }
  }
}
