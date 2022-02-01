import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { AuthLayoutComponent } from '../shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule],
  providers: [],
  exports: [],
})
export class CoreModule {}
