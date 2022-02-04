export interface Bet {
  id: number;
  betted_team: number;
  amount: number;
  odd: number;
  profit: number;
  real_profit: number;
  match_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}
