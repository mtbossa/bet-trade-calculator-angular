import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './core/auth/views/login-page/login-page.component';
import { LogoutComponent } from './core/auth/views/logout/logout.component';
import { RegisterPageComponent } from './core/auth/views/register-page/register-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { DashboardPageComponent } from './modules/dashboard/views/dashboard-page/dashboard-page.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '', // {1}
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // {2}
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'logout',
        component: LogoutComponent, // {5}
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent, // {4}
    canActivate: [GuestGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent, // {5}
      },
      {
        path: 'register',
        component: RegisterPageComponent, // {5}
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
