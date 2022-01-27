import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logIn(credentials: { email: string; password: string }) {
    return this.http
      .get(`${environment.API_URL}/sanctum/csrf-cookie`, {
        headers: new HttpHeaders('Content-Type: application/json'),
        withCredentials: true,
      })
      .pipe(
        switchMap(() =>
          this.http.post(`${environment.API_URL}/login`, credentials, {
            withCredentials: true,
          })
        )
      );
  }
}
