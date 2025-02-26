'use client';

import { useEffect, useState } from 'react';
import { WordCard } from './WordCard';
import { Word } from 'types';
interface WordCardWrapperProps {
  originalWord: string;
  translatedWord: string;
}
export const WordCardWrapper = (props: WordCardWrapperProps) => {
  const [originalWord, setOriginalWord] = useState(props.originalWord);
  const [translatedWord, setTranslatedWord] = useState(props.translatedWord);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [fetchWeightedTrigger, setFetchWeightedTrigger] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleRandomRequested = () => {
    console.log('Button clicked, fetching new word...');
    setFetchTrigger((prev) => prev + 1);
  };

  const handleWeightedRandomRequested = () => {
    console.log('Button clicked, fetching new weighted word...');
    setFetchWeightedTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const getRandomWord = async () => {
      try {
        console.log('Fetching new word...');
        const response = await fetch('/api/word/random');
        const data = await response.json();

        if (!data.word || data.word.length === 0) {
          console.error('Invalid data received:', data);
          return;
        }

        console.log('Fetched data:', data.word[0]);
        //setWord(null); // Unmount old card first

        setTimeout(() => {
          console.log('after timeout');
          setOriginalWord(data.word[0].original_word); // Ensure a new object reference
          setTranslatedWord(data.word[0].translated_word); // Ensure a new object reference
          console.log('after setWord');
          // Mount new card with fresh word
        }, 100); // Small delay for smooth UI transition
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (fetchTrigger > 0) {
      getRandomWord();
    }
  }, [fetchTrigger]);

  useEffect(() => {
    const fetchWords = async () => {
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
        console.log('after timeout');
        if (data.word) {
          setOriginalWord(data.word.original_word);
          setTranslatedWord(data.word.translated_word);
        } // Ensure a new object reference
        console.log('after setWord');
        // Mount new card with fresh word
      }, 100);
    };

    if (fetchWeightedTrigger > 0) {
      fetchWords();
    }
  }, [fetchWeightedTrigger]);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      console.log('yeah?');
      try {
        console.log('yesssah?');

        const res = await fetch('/api/word/words');
        const data = await res.json();
        setWords(data.words);
        //setCurrentWord(selectWord(data)); // Set initial word after fetching
      } catch (error) {
        console.error('Error fetching words:', error);
      }
      setLoading(false);
    };

    fetchWords();
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      {originalWord ? (
        <>
          <WordCard
            key={fetchWeightedTrigger}
            originalWord={originalWord}
            translatedWord={translatedWord}
            handleRandomRequested={handleRandomRequested}
            handleWeightedRandomRequested={handleWeightedRandomRequested}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
