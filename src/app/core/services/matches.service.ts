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

  public createMatch(match: { team_one: string; team_two: string }) {
    return this.http.post<Match>(`${environment.API_URL}/api/matches`, match);
  }

  public deleteMatch(matchId: number) {
    return this.http.delete(`${environment.API_URL}/api/matches/${matchId}`);
  }

  public getSingleMatch(matchId: number, withBets: boolean = true) {
    const queryWithBets = withBets ? 'with_bets=true' : '';
    return this.http
      .get<Match>(
        `${environment.API_URL}/api/matches/${matchId}?${queryWithBets}`
      )
      .pipe(
        take(1),
        map((match: Match) => {
          if (match.bets && match.bets.length > 0) {
            return {
              ...this.calcMatchTotals(match),
            };
          }
          return match;
        })
      );
  }

  public createBet(
    matchId: number,
    bet: { betted_team: number; odd: number; amount: number }
  ) {
    return this.http.post<Bet>(
      `${environment.API_URL}/api/matches/${matchId}/bets`,
      bet
    );
  }

  public getAllMatches(withBets: boolean = true) {
    const queryWithBets = withBets ? 'with_bets=true' : '';
    this.http
      .get<Match[]>(`${environment.API_URL}/api/matches?${queryWithBets}`)
      .pipe(
        take(1),
        map((matches: Match[]) => {
          return matches.map((match) => {
            // If the match has bets, calculate the values
            if (match.bets && match.bets.length > 0) {
              return {
                ...this.calcMatchTotals(match),
              };
            }
            return match;
          });
        })
      )
      .subscribe((matches) => this.matches$.next(matches));
  }

  calcMatchTotals(match: Match): Match {
    let teamOneTotals = { amount: 0, profit: 0, realProfit: 0 };
    let teamTwoTotals = { amount: 0, profit: 0, realProfit: 0 };

    match.bets?.forEach((bet) => {
      let currentTeam = bet.betted_team === 1 ? teamOneTotals : teamTwoTotals;

      currentTeam.amount += bet.amount;
      currentTeam.profit += bet.profit;
    });

    teamOneTotals.realProfit = this._calcTotalRealProfit(
      teamOneTotals.profit,
      teamOneTotals.amount,
      teamTwoTotals.amount
    );
    teamTwoTotals.realProfit = this._calcTotalRealProfit(
      teamTwoTotals.profit,
      teamTwoTotals.amount,
      teamOneTotals.amount
    );

    const equalize = {
      equalize: this._calcEqualize(
        teamOneTotals,
        teamTwoTotals,
        match.team_one,
        match.team_two
      ),
    };

    const newMatch = {
      ...match,
      totals: {
        ...equalize,
        teamOne: teamOneTotals,
        teamTwo: teamTwoTotals,
      },
    };

    if (match.winner_team) {
      return {
        ...newMatch,
        totals: {
          ...newMatch.totals,
          finished: this._calcMatchProfit(
            match.winner_team,
            teamOneTotals,
            teamTwoTotals
          ),
        },
      };
    }

    return newMatch;
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

  private _calcEqualize(
    teamOneTotals: any,
    teamTwoTotals: any,
    teamOneName: string,
    teamTwoName: string
  ) {
    const teamOneRealProfit = teamOneTotals.realProfit;
    const teamTwoRealProfit = teamTwoTotals.realProfit;

    if (teamOneRealProfit > 0 && teamTwoRealProfit < 0) {
      // Bet on team two
      return {
        teamNumber: 2,
        teamName: teamTwoName,
        amount: teamOneTotals.amount,
        odd: this._calcOdd(teamTwoRealProfit, teamOneRealProfit),
      };
    } else if (teamTwoRealProfit > 0 && teamOneRealProfit < 0) {
      // Bet on team one
      return {
        teamNumber: 1,
        teamName: teamOneName,
        amount: teamTwoTotals.amount,
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

  private _calcTotalRealProfit(
    totalProfit: number,
    totalAmount: number,
    opponentTotalAmoumt: number
  ) {
    return totalProfit - totalAmount - opponentTotalAmoumt;
  }
}
