import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  autoLogIn() {
    console.log('autologin');
    // There's no need to handle unauthorized error, auth interceptor already does it. However, could handle other kind of errors, for example 500
    return this._fetchCurrentUser();
  }

  private _getCsrfToken() {
    return this.http
      .get(`${environment.API_URL}/sanctum/csrf-cookie`)
      .pipe(take(1));
  }

  private _fetchCurrentUser() {
    return this.http.get<User>(`${environment.API_URL}/api/user`).pipe(
      take(1),
      tap((res) => console.log('getch res: ', res))
    );
  }

  logIn(credentials: { email: string; password: string }) {
    return this._getCsrfToken().pipe(
      switchMap(() =>
        this.http
          .post(`${environment.API_URL}/login`, credentials)
          .pipe(take(1))
      )
    );
  }

  logOut() {
    console.log('loggin user out');
    this.http
      .post(`${environment.API_URL}/logout`, {})
      .pipe(take(1))
      .subscribe(() => this.logUserOut());
  }

  /**
   * Responsible for making the local changes when user logs in.
   */
  logUserIn(user: User) {
    this.storeUser();
    this.router.navigate(['/dashboard']);
  }

  /**
   * Responsible for making the local changes when user logs out.
   */
  logUserOut() {
    this.user$.next(null);
    this.router.navigate(['/login']);
  }

  storeUser() {
    return this._fetchCurrentUser().pipe(tap((user) => this.user$.next(user)));
  }
}
