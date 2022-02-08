import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Bet } from 'src/app/shared/models/bet.model';
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
      .pipe(
        take(1),
        map((matches: Match[]) => {
          return matches.map((match) => {
            if (match.bets && match.bets.length > 0) {
              return {
                ...match,
                ...this._calcMatchTotals(match.bets),
              };
            }
            return match;
          });
        })
      )
      .subscribe((matches) => this.matches$.next(matches));
  }

  private _calcMatchTotals(matchBets: Bet[]) {
    let matchProfit = 0;
    let matchTotalBetted = 0;

    matchBets.forEach((bet) => {
      matchProfit += bet.real_profit;
      matchTotalBetted += bet.amount;
    });

    return { totals: { profit: matchProfit, amount: matchTotalBetted } };
  }
}
