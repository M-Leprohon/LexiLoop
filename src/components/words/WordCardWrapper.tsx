'use client';

import { useEffect, useState } from 'react';
import { WordCard } from './WordCard';
import { Word } from 'types';
import { useLoading } from '@context/LoadingContext';
import { Switch } from '@nextui-org/react';
import { useInverse } from '@context/InverseContext';

interface WordCardWrapperProps {
  originalWord?: string;
  translatedWord?: string;
}

export const WordCardWrapper = (props: WordCardWrapperProps) => {
  const [originalWord, setOriginalWord] = useState('');
  const [translatedWord, setTranslatedWord] = useState('');
  const [fetchWeightedTrigger, setFetchWeightedTrigger] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const { isLoading, setLoading } = useLoading();
  const { isInverse, setIsInverse } = useInverse();
  const [isSentenceMode, setIsSentenceMode] = useState(false);

  const handleWeightedRandomRequested = () => {
    console.log('Button clicked, fetching new weighted word...');
    setFetchWeightedTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);

      const res = await fetch('/api/word/weighted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ words: words }),
      });
      const data = await res.json();
      console.log(data);

      setTimeout(() => {
        if (data.word) {
          if (props.originalWord) {
            setOriginalWord(props.originalWord || '');
            setTranslatedWord(props.translatedWord || '');

            //unset props, we're entering random mode
            props.originalWord = '';
            props.translatedWord = '';
          } else {
            setOriginalWord(data.word.original_word);
            setTranslatedWord(data.word.translated_word);
          }
        } // Ensure a new object reference
        setLoading(false);
        // Mount new card with fresh word
      }, 100);
    };

    if (fetchWeightedTrigger > 0) {
      fetchWords();
    }
  }, [fetchWeightedTrigger]);

  useEffect(() => {
    setLoading(false);
    const fetchWords = async () => {
      try {
        console.log('yesssah?', isSentenceMode);

        const res = await fetch(
          `/api/word/words?sentence_mode=${isSentenceMode}`
        );
        const data = await res.json();
        setWords(data.words);
        handleWeightedRandomRequested();
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    fetchWords();
  }, [isSentenceMode]);

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      {originalWord ? (
        <>
          <label>Flipped mode</label>
          <Switch
            onClick={(e) => {
              setIsInverse(!isInverse);
            }}
            aria-label="Automatic updates"
          />
          <label>Sentence mode</label>
          <Switch
            onClick={(e) => {
              setIsSentenceMode(!isSentenceMode);
            }}
            aria-label="Automatic updates"
          />
          <WordCard
            key={fetchWeightedTrigger}
            originalWord={originalWord}
            translatedWord={translatedWord}
            handleWeightedRandomRequested={handleWeightedRandomRequested}
            isInverse={isInverse}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
