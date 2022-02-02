import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '../shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';

import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [MainLayoutComponent, AuthLayoutComponent],
  imports: [CommonModule, DashboardModule, RouterModule],
  exports: [],
})
export class MainAppModule {}
