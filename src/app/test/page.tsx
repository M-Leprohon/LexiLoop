'use client'; // Only if using Next.js App Router (`app/` directory)

import { useEffect, useState } from 'react';

const WordTrainer = () => {
  interface Word {
    id: number;
    original_word: string;
    translated_word: string;
  }

  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    const fetchWords = async () => {
      const res2 = await fetch('/api/word/weighted', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
        body: JSON.stringify({ words: words }), // Pass the array of words
      });
      const data2 = await res2.json();
      console.log(data2);
    };
  }, [fetchTrigger]);

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

  const handleRequested = () => {
    console.log('Button clicked, fetching new word...');
    setFetchTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <div>Hi!</div>
      {words.map((word) => (
        <div key={word.id}>
          <p>{word.original_word}</p>
          <p>{word.translated_word}</p>
        </div>
      ))}
    </div>
  );
};

export default WordTrainer;
