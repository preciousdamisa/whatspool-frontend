import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.userService.getUser()?.token || '';

    console.log(req.url);

    if (
      req.url === 'http://localhost:4000/api/users' ||
      req.url === 'http://localhost:4000/api/auth'
    ) {
      return next.handle(req);
    } else {
      const modifiedReq = req.clone({
        headers: new HttpHeaders().set('x-auth-token', token),
      });
      return next.handle(modifiedReq);
    }
  }
}
