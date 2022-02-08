import { Bet } from './bet.model';

export interface Match {
  id: number;
  team_one: string;
  team_two: string;
  user_id: number;
  winner_team?: number;
  bets?: Array<Bet>;
  totals?: {
    equalize?: { teamNumber: number; teamName: string; amount: number; odd: number };
    teamOne?: { amount: number; profit: number; realProfit: number };
    teamTwo?: { amount: number; profit: number; realProfit: number };
    finished?: { realProfit: number };
  };
  created_at: string;
  updated_at: string;
}
