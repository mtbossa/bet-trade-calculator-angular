import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { LogoutComponent } from './core/auth/pages/logout/logout.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const ROUTES: Routes = [
  {
    path: '', // {1}
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // {2}
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent, // {3}
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
        component: LoginComponent, // {5}
      },
      {
        path: 'register',
        component: RegisterComponent, // {5}
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
