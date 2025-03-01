import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '../../../../utils/supabase/server';
import { Word } from 'types';

export async function GET() {
  const supabase = createClient();
  const { data: words } = await supabase.from('word').select();
  console.log('we got this data from server', words);
  return Response.json({ words });
}
export async function POST(request: Request) {
  const body = await request.json();
  let word = selectWord(body.words);
  return Response.json({ word });
}

/**
 * Sigmoid function for probability weighting
 */
const sigmoid = (x: number, k: number, c: number): number => {
  return 1 / (1 + Math.exp(k * (x - c)));
};

/**
 * Selects a word based on familiarity using weighted probability.
 * @param words - List of words with familiarity scores.
 * @param k - Slope of sigmoid function (default 1.5).
 * @param c - Familiarity threshold where probability declines (default 5).
 * @param epsilon - Small baseline weight for all words.
 * @returns Selected word.
 */
export const selectWord = (
  words: Word[],
  k: number = 1.0,
  c: number = 5,
  epsilon: number = 0.1
): Word | null => {
  if (words.length === 0) return null;

  // Compute weights using inverse familiarity probability
  const weights = words.map((w) => ({
    word: w,
    weight: sigmoid(parseInt(w.familiarity), k, c) + epsilon, // Ensure minimum probability
  }));

  // Normalize weights
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  if (totalWeight === 0) return words[Math.floor(Math.random() * words.length)];

  // Weighted random selection
  let rand = Math.random() * totalWeight;
  for (const w of weights) {
    rand -= w.weight;
    if (rand <= 0) return w.word;
  }

  return words[0]; // Fallback
};
