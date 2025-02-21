'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UpdateFamiliarity from '../../actions/update-familiarity';
import TinderCard from 'react-tinder-card';
import { Button } from '@nextui-org/react';
import { ButtonRefresh } from '@components/ButtonRefresh';
import { useRouter } from 'next/navigation';
import { WordCard } from './WordCard';

interface WordCardWrapperProps {
  originalWord: string;
  translatedWord: string;
}
export const WordCardWrapper = (props: WordCardWrapperProps) => {
  const [originalWord, setOriginalWord] = useState(props.originalWord);
  const [translatedWord, setTranslatedWord] = useState(props.translatedWord);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [flip, setFlip] = useState(true);

  const handleRandomRequested = () => {
    console.log('Button clicked, fetching new word...');
    setFetchTrigger((prev) => prev + 1);
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
          setFlip(true);
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
  return (
    <div>
      {originalWord ? (
        <>
          <WordCard
            key={fetchTrigger}
            originalWord={originalWord}
            translatedWord={translatedWord}
            handleRandomRequested={handleRandomRequested}
            flip={flip}
          />
          <div className="flex justify-center items-center">
            <Button
              className="flex"
              onClick={() => setFlip((prevState) => !prevState)}
            >
              Flip
            </Button>
            <Button className="flex" onClick={handleRandomRequested}>
              Random
            </Button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
