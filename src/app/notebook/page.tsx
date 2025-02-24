import { fetchAllWords } from '@db/words';
import { WordList } from '@components/words/WordList';
import Link from 'next/link';

export default async function WordFiltering() {
  const words = await fetchAllWords();

  return words == null || words.length == 0 ? (
    <div>
      No words found,{' '}
      <Link className="underline" href="/">
        start adding words!
      </Link>
    </div>
  ) : (
    <div>
      <h2>Words</h2>
      <div>
        <WordList words={words} />
      </div>
    </div>
  );
}
