import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogoutComponent } from './core/auth/logout/logout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // If user not authenticated, AuthGuard will redirect to /login
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'matches',
        loadChildren: () =>
          import('./modules/matches/matches.module').then(
            (m) => m.MatchesModule
          ),
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [GuestGuard], // Is user is authenticated and tries to enter auth routes, will be redirected to dashboard by this guard.
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/auth/auth.module').then((m) => m.AuthModule),
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
