import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamNameComponent } from './components/team-name/team-name.component';

@NgModule({
  declarations: [DashboardComponent, MatchCardComponent, TeamNameComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
