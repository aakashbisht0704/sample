import { Activity } from '../lib/types';

export const activities: Activity[] = [
  { id: 'a1', type: 'mcq', difficulty: 'easy', prompt: '1/3 + 1/6 = ?', choices: ['1/2','2/3','1/6','5/6'], answer: '1/2', hint: 'Find LCM of denominators.' },
  { id: 'a2', type: 'input', difficulty: 'easy', prompt: 'Fill: 2/5 + 1/5 = ___', answer: '3/5', hint: 'Same denominator → add numerators.' },
  { id: 'a3', type: 'image', difficulty: 'easy', prompt: 'Which is bigger: 1/2 or 1/3?', image: '', choices: ['1/2','1/3'], answer: '1/2', hint: 'Visual area.' },
  { id: 'a4', type: 'example', difficulty: 'easy', prompt: 'Example: 1/4 + 1/4 = 1/2. What is 1/4 + 2/4?', answer: '3/4', hint: 'Combine numerators.' },
  { id: 'a5', type: 'mcq', difficulty: 'medium', prompt: 'Add: 3/8 + 1/4 = ?', choices: ['1/2','5/8','3/4','7/8'], answer: '5/8', hint: 'Convert 1/4 to 2/8.' },
  { id: 'a6', type: 'input', difficulty: 'medium', prompt: 'Fill: 5/6 + 1/3 = ___', answer: '7/6', hint: 'Common denominator 6.' },
  { id: 'a7', type: 'image', difficulty: 'medium', prompt: 'Select fraction equal to 2/3', image: '', choices: ['4/6','3/4','1/3','2/5'], answer: '4/6', hint: 'Scale numerator/denominator.' },
  { id: 'a8', type: 'example', difficulty: 'medium', prompt: 'Worked: 1/3 + 1/6 -> 1/2. Now 2/3 + 1/6 = ?', answer: '5/6', hint: 'Use LCM 6.' },
  { id: 'a9', type: 'mcq', difficulty: 'hard', prompt: 'Which is larger: 5/7 or 4/6?', choices: ['5/7','4/6','Equal','Need more info'], answer: '4/6', hint: 'Cross-multiply.' },
  { id: 'a10', type: 'input', difficulty: 'hard', prompt: 'Fill: 7/12 + 5/8 = ___', answer: '41/24', hint: 'LCM 24.' },
  { id: 'a11', type: 'tip', difficulty: 'easy', prompt: 'Tip: To add fractions, always find a common denominator.' },
  { id: 'a12', type: 'break', difficulty: 'easy', prompt: 'Take 20s to stretch and breathe.' }
];
