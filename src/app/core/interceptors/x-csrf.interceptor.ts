import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class XXsrfInterceptor implements HttpInterceptor {
  private headerName = 'X-XSRF-TOKEN';
  constructor(
    private cookieService: CookieService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('XSRF-TOKEN');

    if (token && !request.headers.has(this.headerName)) {
      request = request.clone({
        headers: request.headers.set(this.headerName, token),
      });
    }
    return next.handle(request);
  }
}
