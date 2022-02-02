import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const AUTH_ROUTES = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent, // {5}
  },
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
