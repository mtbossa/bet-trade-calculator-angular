import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private headerName = 'X-XSRF-TOKEN';
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.authService.removeUserLocalStorage();
      this.router.navigateByUrl(`/login`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(() => new Error(err.message));
  }

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
    return next
      .handle(request.clone({ withCredentials: true }))
      .pipe(catchError((x) => this.handleAuthError(x)));
  }
}
