import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatchesService } from 'src/app/core/services/matches.service';
import { Match } from 'src/app/shared/models/match.model';
import {
  faTrophy,
  faEquals,
  faGavel,
  faReceipt,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

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
  public faEquals = faEquals;
  public faGavel = faGavel;
  public faReceipt = faReceipt;
  public faChartLine = faChartLine;

  constructor(private matchesService: MatchesService) {}

  onDelete(matchId: number) {
    this.deleted.emit(matchId);
  }

  getMatchStatus() {
    return this.match?.winner_team ? 'Finished' : 'On Going';
  }
}
