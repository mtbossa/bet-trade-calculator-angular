import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from './views/login-page/login-page.component';
import { LogoutComponent } from './views/logout/logout.component';
import { RegisterPageComponent } from './views/register-page/register-page.component';

@NgModule({
  declarations: [LoginPageComponent, LogoutComponent, RegisterPageComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [],
})
export class AuthModule {}
