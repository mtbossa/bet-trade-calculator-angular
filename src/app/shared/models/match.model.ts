import { Bet } from './bet.model';

export interface Equalize {
  teamNumber: number;
  teamName: string;
  amount: number;
  odd: number;
}

export interface TeamTotals {
  amount: number;
  profit: number;
  realProfit: number;
  finalProfit: number;
}

export interface Match {
  id: number;
  team_one: string;
  team_two: string;
  user_id: number;
  winner_team?: number;
  bets: Array<Bet>;
  totals?: {
    equalize?: Equalize;
    teamOne?: TeamTotals;
    teamTwo?: TeamTotals;
    finished?: { realProfit: number };
  };
  created_at: string;
  updated_at: string;
}
