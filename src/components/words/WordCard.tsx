'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import UpdateFamiliarity from '../../actions/update-familiarity';
import TinderCard from 'react-tinder-card';
import { Button } from '@nextui-org/react';

interface WordCardProps {
  originalWord: string;
  translatedWord: string;
  handleRandomRequested?: () => void;
}

export const WordCard = ({
  originalWord,
  translatedWord,
  handleRandomRequested,
}: WordCardProps) => {
  const [flip, setFlip] = useState(true);

  if (!originalWord) {
    return <p>Loading word...</p>;
  }
  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + ' left the screen');
    handleRandomRequested && handleRandomRequested();
  };
  const onSwipe = (direction: string) => {
    console.log('You swiped: ' + direction);
    UpdateFamiliarity(originalWord || '', direction);
  };

  return (
    <>
      <div className="tinder">
        <TinderCard
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen(originalWord)}
          className=""
        >
          <motion.div
            className="w-[60vw] h-[50vh] md:h-[30vh] flex-1 flex flex-col justify-center items-center"
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flip ? 0 : 180 }}
          >
            <motion.div
              transition={{ duration: 0.7 }}
              animate={{ rotateY: flip ? 0 : 180 }}
              className="Card shadow-md bg-sky-600 md:w-48 w-full flex-1 flex flex-col justify-center items-center rounded-2xl"
            >
              <motion.div
                transition={{ duration: 0.7 }}
                animate={{ rotateY: flip ? 0 : 180 }}
                className="front absolute text-white text-4xl break-all hyphens-auto whitespace-normal"
              >
                {originalWord}
              </motion.div>
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: flip ? 180 : 0 }}
                // style={{ display: flip ? "none" : "block" }}
                transition={{ duration: 0.7 }}
                className="back absolute text-white text-4xl break-all hyphens-auto whitespace-normal"
              >
                {translatedWord}
              </motion.div>
            </motion.div>
          </motion.div>
        </TinderCard>
        <div className="flex justify-center items-center mt-4">
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
      </div>
    </>
  );
};
