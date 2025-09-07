export type Difficulty = 'very_easy' | 'easy' | 'medium' | 'hard' | 'very_hard';
export type ActivityType = 'mcq' | 'input' | 'image' | 'example' | 'tip' | 'break';

export interface Activity {
  id: string;
  type: ActivityType;
  difficulty: Difficulty;
  prompt: string;
  choices?: string[];
  answer?: string;
  hint?: string;
  image?: string;
}

export interface AdaptiveState {
  mastery: number; // 0..1
  streak: number;
  fatigue: number; // 0..1
  lastScores: number[]; // Array of recent scores (1 for correct, 0 for incorrect)
}

export interface UserPerformance {
  user_id: string;
  current_difficulty: Difficulty;
  response_time_ms: number;
  hints_used: number;
  correct: boolean;
  last_scores: number[];
}
