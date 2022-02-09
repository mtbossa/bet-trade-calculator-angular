import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchesService } from 'src/app/core/services/matches.service';
import { Match } from 'src/app/shared/models/match.model';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit {
  @Input() match?: Match;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    console.log("🚀 ~ file: match-card.component.ts ~ line 18 ~ MatchCardComponent ~ ngOnInit ~ this.match", this.match)
  }

  onDelete(matchId: number) {
    this.deleted.emit(matchId);
  }
}
