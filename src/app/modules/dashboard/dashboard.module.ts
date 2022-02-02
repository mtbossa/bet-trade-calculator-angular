import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, RouterModule, MatGridListModule, LayoutModule],
})
export class DashboardModule {}
