import { Component, Input, OnInit } from '@angular/core';

import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-team-name',
  templateUrl: './team-name.component.html',
  styleUrls: ['./team-name.component.scss'],
})
export class TeamNameComponent {
  @Input() teamName!: string;
  @Input() teamNumber!: number;
  @Input() winnerTeam?: number;
  @Input() realProfit?: number;
  @Input() teamFinalProfit?: number;

  // icons
  public faTrophy = faTrophy;

  constructor() {}
}
