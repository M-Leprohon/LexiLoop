import { fetchAllWords } from '@db/words';
import { WordList } from '@components/words/WordList';

export default async function WordFiltering() {
  const words = await fetchAllWords();

  return words == null || words.length == 0 ? (
    <div>Add words to get started</div>
  ) : (
    <div>
      <h2>Words</h2>
      <div>
        <WordList words={words} />
      </div>
    </div>
  );
}
