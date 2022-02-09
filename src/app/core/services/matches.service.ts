import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Match } from 'src/app/shared/models/match.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  public matches$ = new BehaviorSubject<Match[] | []>([]);

  constructor(private http: HttpClient) {}

  public createMatch(match: { team_one: string; team_two: string }) {
    return this.http.post<Match>(`${environment.API_URL}/api/matches`, match);
  }

  public deleteMatch(matchId: number) {
    return this.http.delete(`${environment.API_URL}/api/matches/${matchId}`);
  }

  public getAllMatches() {
    this.http
      .get<Match[]>(`${environment.API_URL}/api/matches?with_bets=true`)
      .pipe(
        take(1),
        map((matches: Match[]) => {
          return matches.map((match) => {
            // If the match has bets, calculate the values
            if (match.bets && match.bets.length > 0) {
              return {
                ...this._calcMatchTotals(match),
              };
            }
            return match;
          });
        })
      )
      .subscribe((matches) => this.matches$.next(matches));
  }

  private _calcMatchTotals(match: Match): Match {
    let teamOneTotals = { amount: 0, profit: 0, realProfit: 0 };
    let teamTwoTotals = { amount: 0, profit: 0, realProfit: 0 };

    match.bets?.forEach((bet) => {
      let currentTeam = bet.betted_team === 1 ? teamOneTotals : teamTwoTotals;

      currentTeam.amount += bet.amount;
      currentTeam.profit += bet.profit;
    });

    teamOneTotals.realProfit = teamOneTotals.profit - teamTwoTotals.amount;
    teamTwoTotals.realProfit = teamTwoTotals.profit - teamOneTotals.amount;

    if (match.winner_team) {
      return {
        ...match,
        totals: {
          equalize: this._calcEqualize(teamOneTotals, teamTwoTotals),
          teamOne: teamOneTotals,
          teamTwo: teamTwoTotals,
          finished: this._calcMatchProfit(
            match.winner_team,
            teamOneTotals,
            teamTwoTotals
          ),
        },
      };
    }

    return {
      ...match,
      totals: {
        equalize: this._calcEqualize(teamOneTotals, teamTwoTotals),
        teamOne: teamOneTotals,
        teamTwo: teamTwoTotals,
      },
    };
  }

  private _calcMatchProfit(
    winnerTeam: number,
    teamOneTotals: any,
    teamTwoTotals: any
  ) {
    if (winnerTeam === 1) {
      return {
        realProfit: teamOneTotals.realProfit - teamTwoTotals.amount,
      };
    } else {
      return {
        realProfit: teamTwoTotals.realProfit - teamOneTotals.amount,
      };
    }
  }

  private _calcEqualize(teamOneTotals: any, teamTwoTotals: any) {
    const teamOneRealProfit = teamOneTotals.realProfit;
    const teamTwoRealProfit = teamTwoTotals.realProfit;
    console.log(teamOneRealProfit);
    console.log(teamTwoRealProfit);

    if (teamOneRealProfit > 0 && teamTwoRealProfit < 0) {
      // Bet on team two
      console.log('oi');
      return {
        teamNumber: 2,
        teamName: 'team_two',
        amount: teamOneRealProfit,
        odd: this._calcOdd(teamTwoRealProfit, teamOneRealProfit),
      };
    } else if (teamTwoRealProfit > 0 && teamOneRealProfit < 0) {
      // Bet on team one
      console.log('tchau');
      return {
        teamNumber: 2,
        teamName: 'team_two',
        amount: teamOneRealProfit,
        odd: this._calcOdd(teamOneRealProfit, teamTwoRealProfit),
      };
    }

    return {
      teamNumber: 0,
      teamName: '',
      amount: 0,
      odd: 0,
    };
  }

  private _calcOdd(debtTeamRealProfit: number, profitTeamRealProfit: number) {
    return (profitTeamRealProfit - debtTeamRealProfit) / profitTeamRealProfit;
  }
}
