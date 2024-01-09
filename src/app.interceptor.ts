import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AUTHORIZATION_KEY } from './main';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (request.headers['authorization'] === AUTHORIZATION_KEY) {
      return next.handle();
    } else {
      throw new ForbiddenException();
    }
  }
}
