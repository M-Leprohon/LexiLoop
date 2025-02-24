import { WordCardWrapper } from '@components/words/WordCardWrapper';
import { createClient } from '@utils/supabase/server';
import Link from 'next/link';

export default async function randomWord() {
  const supabase = createClient();
  const { data: word } = await supabase.from('random_word').select().limit(1);
  console.log(word);
  return word && word?.length > 0 ? (
    <WordCardWrapper
      originalWord={word[0].original_word}
      translatedWord={word[0].translated_word}
    ></WordCardWrapper>
  ) : (
    <div>
      No words found,{' '}
      <Link className="underline" href="/">
        start adding words!
      </Link>
    </div>
  );
}
