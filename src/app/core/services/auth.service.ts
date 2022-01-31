import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
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
    // There's no need to handle unauthorized error, auth interceptor already does it. However, could handle other kind of errors, for example 500
    this._fetchCurrentUser().subscribe({
      next: (user) => {
        this.user$.next(user);
        this.router.navigate(['/dashboard']);
      },
    });
  }

  private _getCsrfToken() {
    return this.http
      .get(`${environment.API_URL}/sanctum/csrf-cookie`)
      .pipe(take(1));
  }

  private _fetchCurrentUser() {
    return this.http.get<User>(`${environment.API_URL}/api/user`).pipe(take(1));
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
