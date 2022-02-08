import { Bet } from './bet.model';

export interface Match {
  id: number;
  team_one: string;
  team_two: string;
  user_id: number;
  winner_team?: number;
  bets?: Array<Bet>;
  totals?: { profit: number; amount: number };
  created_at: string;
  updated_at: string;
}
