import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [LoginPageComponent, RegisterComponent, LogoutComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [],
})
export class AuthModule {}
