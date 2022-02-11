import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatchesService } from 'src/app/core/services/matches.service';
import { Match } from 'src/app/shared/models/match.model';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent {
  @Input() match?: Match;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  // icons
  public faTrophy = faTrophy;

  constructor(private matchesService: MatchesService) {}

  onDelete(matchId: number) {
    this.deleted.emit(matchId);
  }
}
