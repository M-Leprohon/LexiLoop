import { WordCard } from '@components/words/WordCard';
import { createClient } from '@utils/supabase/server';

export default async function randomWord() {
  const supabase = createClient();
  const { data: word } = await supabase.from('random_word').select().limit(1);

  return word ? (
    <WordCard
      originalWord={word[0].original_word}
      translatedWord={word[0].translated_word}
    ></WordCard>
  ) : (
    <div>Word not found</div>
  );
}
