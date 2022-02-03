import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
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
        loadChildren: () =>
          import('./core/auth/logout/logout.module').then(
            (m) => m.LogoutModule
          ),
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
        loadChildren: () =>
          import('./core/auth/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./core/auth/register/register.module').then(
            (m) => m.RegisterModule
          ),
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
