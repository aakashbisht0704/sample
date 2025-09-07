import type { Activity, UserPerformance } from './types';

const ML_SERVICE_URL = process.env.NEXT_PUBLIC_ML_SERVICE_URL || 'http://localhost:8000';

export async function getNextQuestion(performance: UserPerformance): Promise<{
  question: Activity;
  next_difficulty: string;
}> {
  const response = await fetch(`${ML_SERVICE_URL}/api/next-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(performance),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch next question');
  }

  return response.json();
}
