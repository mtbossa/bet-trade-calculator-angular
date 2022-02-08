import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/core/services/matches.service';
import { Match } from 'src/app/shared/models/match.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public matches: Match[] = [];

  constructor(private matchService: MatchesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.matchService.getAllMatches();
    this.matchService.matches$.subscribe((res) => {
      this.matches = [...res];
      console.log('oi: ', this.matches);
    });

    // TODO calc totals of the retrieved matches
  }
}
