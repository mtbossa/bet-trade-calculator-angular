import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, MatchCardComponent],
  imports: [CommonModule, ReactiveFormsModule, DashboardRoutingModule],
})
export class DashboardModule {}
