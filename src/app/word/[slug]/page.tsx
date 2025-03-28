import { fetchWordBySlug } from '@db/words';
import { WordCardWrapper } from '@components/words/WordCardWrapper';
import Link from 'next/link';
//import randomWord from '@/components/words/WordRandomizer'
import { redirect } from 'next/navigation';
import { Word } from 'types';

interface TranslationShowProps {
  params: {
    slug: string;
  };
}

export default async function TranslationShow({
  params,
}: TranslationShowProps) {
  let word: Word | null = await fetchWordBySlug(decodeURI(params.slug));

  console.log('This is the word: ', word);
  //const url = await randomWord();
  if (
    word?.translated_word == 'notTranslated' ||
    word?.translated_word == null
  ) {
    redirect(`/word/${params.slug}/translate`);
  }
  let output = (
    <div className="flex flex-1 flex-col justify-center items-center">
      <WordCardWrapper
        originalWord={word?.original_word}
        translatedWord={word?.translated_word}
      />
    </div>
  );
  if (word == null) {
    output = <div>Word not found</div>;
  }
  return output;
}
