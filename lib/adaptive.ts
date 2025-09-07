import { AdaptiveState, ActivityType } from './types';

interface UpdateStateParams {
  prev: AdaptiveState;
  correct: boolean;
  rtMs: number;
  hints: number;
  mastery: number;
  streak: number;
}

export function initState(): AdaptiveState {
  return { mastery: 0.25, streak: 0, fatigue: 0, lastScores: [] };
}

export function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

export function updateState(prev: AdaptiveState, correct: boolean, rtMs: number, hints: number): AdaptiveState {
  const learnRate = 0.12;
  const forgetRate = 0.08;
  const speedFactor = clamp01((60000 - rtMs) / 60000);
  const hintPenalty = 0.05 * hints;

  let mastery = prev.mastery + (correct ? learnRate : -forgetRate) + 0.05 * (speedFactor - 0.5) - hintPenalty;
  mastery = clamp01(mastery);

  const streak = correct ? prev.streak + 1 : 0;

  let fatigue = prev.fatigue + (rtMs > 45000 ? 0.08 : 0) + (hints > 0 ? 0.05 : 0) + (correct ? -0.02 : 0.04);
  fatigue = clamp01(fatigue);

  // Update lastScores array with the new result
  const lastScores = [...prev.lastScores, correct ? 1 : 0].slice(-5); // Keep last 5 scores

  return { mastery, streak, fatigue, lastScores };
}

export function decideNext(state: AdaptiveState) {
  if (state.mastery < 0.4) return { type: 'example' as ActivityType, difficulty: 'easy', reason: 'low mastery' };
  if (state.mastery < 0.7) return { type: 'mcq' as ActivityType, difficulty: 'medium', reason: 'practice' };
  return { type: 'mcq' as ActivityType, difficulty: 'hard', reason: 'advanced' };
}
