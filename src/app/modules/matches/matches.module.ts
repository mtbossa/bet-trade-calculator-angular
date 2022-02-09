import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { MatchesRoutingModule } from './matches-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MatchesComponent],
  imports: [CommonModule, ReactiveFormsModule, MatchesRoutingModule],
})
export class MatchesModule {}
