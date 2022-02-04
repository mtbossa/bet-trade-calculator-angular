import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { CookieModule } from 'ngx-cookie';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { AppNavComponent } from './layouts/main-layout/components/app-nav/app-nav.component';

function resourceProviderFactory(authService: AuthService) {
  return () => {
    return new Promise((resolve, reject) => {
      authService.autoLogIn().subscribe({
        next: (user) => {
          authService.user$.next(user);
          resolve(true);
        },
        // TODO Must check for server errors (offline) and do something about it
        error: (err) => {
          authService.logOut().subscribe(() => authService.logUserOut());
          resolve(true);
        },
      });
    });
  };
}

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, CookieModule.forRoot()],
  exports: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: resourceProviderFactory,
      deps: [AuthService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
