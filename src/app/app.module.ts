import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthService } from './core/services/auth.service';
import { MainAppModule } from './modules/main-app.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

function resourceProviderFactory(authService: AuthService) {
  return () => {
    console.log('app init');
    return new Promise((resolve, reject) => {
      authService.autoLogIn().subscribe({
        next: (user) => {
          console.log('app init user: ', user);
          authService.user$.next(user);
          resolve(true);
        },
        error: (err) => {
          console.log('error');
          console.log('err');
          authService.logUserOut();
          resolve(true);
        },
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    CoreModule,
    MainAppModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: resourceProviderFactory,
      deps: [AuthService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
