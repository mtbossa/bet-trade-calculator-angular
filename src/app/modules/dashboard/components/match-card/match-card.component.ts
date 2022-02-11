import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchesService } from 'src/app/core/services/matches.service';
import { Bet } from 'src/app/shared/models/bet.model';
import { Match } from 'src/app/shared/models/match.model';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit {
  @Input() match?: Match;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  public teamOneBets?: Array<Bet>;
  public teamTwoBets?: Array<Bet>;

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    this.teamOneBets = this.getTeamBets(1);
    this.teamTwoBets = this.getTeamBets(2);
  }

  onDelete(matchId: number) {
    this.deleted.emit(matchId);
  }

  public getTeamBets(team: number) {
    return this.match?.bets.filter((bet) => bet.betted_team === team);
  }
}
