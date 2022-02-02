import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { GuestGuard } from '../core/guards/guest.guard';
import { AuthLayoutComponent } from '../shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from '../shared/pages/page-not-found/page-not-found.component';

const MAIN_APP_ROUTES = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent, // {4}
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../core/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(MAIN_APP_ROUTES)],
  exports: [RouterModule],
})
export class MainAppRoutingModule {}
