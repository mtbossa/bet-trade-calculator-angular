import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [LoginPageComponent, LogoutComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AuthRoutingModule,
    AngularMaterialModule,
  ],
  exports: [],
})
export class AuthModule {}
