'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import UpdateFamiliarity from '../../actions/update-familiarity';
import TinderCard from 'react-tinder-card';
import { Button } from '@nextui-org/react';
import { compare } from 'bcryptjs';

interface WordCardProps {
  originalWord: string;
  translatedWord: string;
  handleWeightedRandomRequested?: () => void;
  isInverse: boolean;
}

export const WordCard = ({
  originalWord,
  translatedWord,
  handleWeightedRandomRequested,
  isInverse,
}: WordCardProps) => {
  const [flip, setFlip] = useState(true);
  if (!originalWord) {
    return <p>Loading word...</p>;
  }
  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + ' left the screen');
    handleWeightedRandomRequested && handleWeightedRandomRequested();
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
            className="w-[60vw] h-[40vh] md:h-[30vh] flex-1 flex flex-col justify-center items-center"
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flip ? 0 : 180 }}
          >
            <motion.div
              transition={{ duration: 0.7 }}
              animate={{ rotateY: flip ? 0 : 180 }}
              className="Card text-shadow dark:text-gray-700 text-gray-700 @apply shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_6px_6px] @apply bg-[#8EC5FC] bg-[linear-gradient(62deg,#8EC5FC_0%,#E0C3FC_100%)] md:w-48 w-full flex-1 flex flex-col justify-center items-center rounded-2xl text-4xl break-all hyphens-auto whitespace-normal"
            >
              <motion.div
                transition={{ duration: 0.7 }}
                animate={{ rotateY: flip ? 0 : 180 }}
                className="front absolute"
              >
                {isInverse ? translatedWord : originalWord}
              </motion.div>
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: flip ? 180 : 0 }}
                // style={{ display: flip ? "none" : "block" }}
                transition={{ duration: 0.7 }}
                className="back absolute"
              >
                {isInverse ? originalWord : translatedWord}
              </motion.div>
            </motion.div>
          </motion.div>
        </TinderCard>
        <div className="flex justify-center items-center mt-6">
          <Button
            className="flex"
            onClick={() => setFlip((prevState) => !prevState)}
          >
            Flip
          </Button>
        </div>
      </div>
    </>
  );
};
