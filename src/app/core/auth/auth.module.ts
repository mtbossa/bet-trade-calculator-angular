import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [LoginPageComponent, LogoutComponent, RegisterPageComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [],
})
export class AuthModule {}
