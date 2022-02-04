import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Match } from 'src/app/shared/models/match.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  public matches$ = new BehaviorSubject<Match[] | []>([]);

  constructor(private http: HttpClient) {}

  getAllMatches() {
    this.http
      .get<Match[]>(`${environment.API_URL}/api/matches?with_bets=true`)
      .pipe(take(1))
      .subscribe((res) => this.matches$.next(res));
  }
}
