import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { Bet } from 'src/app/shared/models/bet.model';
import { Equalize, Match, TeamTotals } from 'src/app/shared/models/match.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  public matches$ = new BehaviorSubject<Match[] | []>([]);

  constructor(private http: HttpClient) {}

  public deleteBet(betId: number) {
    return this.http
      .delete(`${environment.API_URL}/api/bets/${betId}`)
      .pipe(take(1));
  }

  public createMatch(match: Match): Observable<Match> {
    return this.http
      .post<Match>(`${environment.API_URL}/api/matches`, match)
      .pipe(take(1));
  }

  public deleteMatch(matchId: number) {
    return this.http
      .delete(`${environment.API_URL}/api/matches/${matchId}`)
      .pipe(take(1));
  }

  public getSingleMatch(
    matchId: number,
    withBets: boolean = true
  ): Observable<Match> {
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

  public createBet(matchId: number, bet: Bet): Observable<Bet> {
    return this.http
      .post<Bet>(`${environment.API_URL}/api/matches/${matchId}/bets`, bet)
      .pipe(take(1));
  }

  public getAllMatches(withBets: boolean = true): void {
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

  public calcMatchTotals(match: Match): Match {
    let teamOneTotals: TeamTotals = {
      amount: 0,
      profit: 0,
      realProfit: 0,
      finalProfit: 0,
    };
    let teamTwoTotals: TeamTotals = {
      amount: 0,
      profit: 0,
      realProfit: 0,
      finalProfit: 0,
    };

    match.bets.forEach((bet) => {
      let currentTeam = bet.betted_team === 1 ? teamOneTotals : teamTwoTotals;

      currentTeam.amount += bet.amount;
      currentTeam.profit += bet.profit;
    });

    teamOneTotals = {
      ...teamOneTotals,
      ...this._calcTotalRealProfit(
        teamOneTotals.profit,
        teamOneTotals.amount,
        teamTwoTotals.amount
      ),
    };
    teamTwoTotals = {
      ...teamTwoTotals,
      ...this._calcTotalRealProfit(
        teamTwoTotals.profit,
        teamTwoTotals.amount,
        teamOneTotals.amount
      ),
    };

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
  ): { realProfit: number } {
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
    teamOneTotals: TeamTotals,
    teamTwoTotals: TeamTotals,
    teamOneName: string,
    teamTwoName: string
  ): Equalize {
    const teamOneFinalProfit = teamOneTotals.finalProfit;
    const teamTwoFinalProfit = teamTwoTotals.finalProfit;

    if (teamOneFinalProfit > 0 && teamTwoFinalProfit < 0) {
      // Bet on team two
      return {
        teamNumber: 2,
        teamName: teamTwoName,
        amount: teamOneTotals.finalProfit,
        odd: this._calcOdd(teamTwoFinalProfit, teamOneFinalProfit),
      };
    } else if (teamTwoFinalProfit > 0 && teamOneFinalProfit < 0) {
      // Bet on team one
      return {
        teamNumber: 1,
        teamName: teamOneName,
        amount: teamTwoTotals.finalProfit,
        odd: this._calcOdd(teamOneFinalProfit, teamTwoFinalProfit),
      };
    }

    return {
      teamNumber: 0,
      teamName: '',
      amount: 0,
      odd: 0,
    };
  }

  private _calcOdd(
    debtTeamFinalProfit: number,
    profitTeamFinalProfit: number
  ): number {
    return (
      (profitTeamFinalProfit - debtTeamFinalProfit) / profitTeamFinalProfit
    );
  }

  private _calcTotalRealProfit(
    teamTotalProfit: number,
    teamTotalAmount: number,
    opponentTotalAmoumt: number
  ): { realProfit: number; finalProfit: number } {
    const realProfit = teamTotalProfit - teamTotalAmount;
    const finalProfit = realProfit - opponentTotalAmoumt;

    return {
      realProfit: realProfit,
      finalProfit: finalProfit,
    };
  }
}
