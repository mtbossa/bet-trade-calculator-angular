import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getCsrfToken() {
    return this.http.get(`${environment.API_URL}/sanctum/csrf-cookie`);
  }

  logIn(credentials: { email: string; password: string }) {
    return this.getCsrfToken().pipe(
      switchMap(() =>
        this.http.post(`${environment.API_URL}/login`, credentials)
      )
    );
  }

  getCurrentUser() {
    return this.http.get(`${environment.API_URL}/api/user`);
  }

  saveUser() {
    this.getCurrentUser()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log('saveUser: ', res);
          this.storeUserLocalStorage(res);
        },
      });
  }

  storeUserLocalStorage(user: {}) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  removeUserLocalStorage() {
    localStorage.removeItem('loggedUser');
  }

  logOut() {
    return this.http.post(`${environment.API_URL}/logout`, {});
  }
}
