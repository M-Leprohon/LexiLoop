'use server';

import { createClient } from '../utils/supabase/server';

export default async function UpdateFamiliarity(
  word: string,
  familiarity: string
) {
  const supabase = createClient();

  let change = 0;

  console.log('from server ' + familiarity);

  if (familiarity == 'right') {
    change = 1;
  }
  if (familiarity == 'left') {
    change = -1;
  }
  const { error } = await supabase.rpc('increment', {
    x: change,
    og_word: word,
  });
}
