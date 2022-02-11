import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchesService } from 'src/app/core/services/matches.service';
import { Bet } from 'src/app/shared/models/bet.model';
import { Match } from 'src/app/shared/models/match.model';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent {
  @Input() match?: Match;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private matchesService: MatchesService) {}

  onDelete(matchId: number) {
    this.deleted.emit(matchId);
  }
}
