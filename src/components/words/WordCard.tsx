'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UpdateFamiliarity from '../../actions/update-familiarity';
import TinderCard from 'react-tinder-card';
import { Button } from '@nextui-org/react';
import { ButtonRefresh } from '@components/ButtonRefresh';
import { useRouter } from 'next/navigation';

interface Props {
  originalWord?: string;
  translatedWord?: string;
}

export const WordCard = (props: Props) => {
  const [flip, setFlip] = useState(true);
  const [needAnother, setNeedAnother] = useState(false);
  const router = useRouter();

  //this.addEventListener('dragstart', handleDragStart, false);
  const onSwipe = (direction: string) => {
    console.log('You swiped: ' + direction);
    UpdateFamiliarity(props.originalWord || '', direction);
  };

  useEffect(() => {
    console.log('triggered', needAnother);
    if (needAnother) {
      router.push(`/random?refreshId=${new Date().getTime()}`);
      router.refresh();
    }
  }, [needAnother]);
  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + ' left the screen');
    setNeedAnother(true);
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <TinderCard
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen('fooBar')}
          className=""
        >
          <motion.div
            className="w-[60vw] h-[60vh] flex-1 flex flex-col justify-center items-center"
            transition={{ duration: 0.7 }}
            animate={{ rotateY: flip ? 0 : 180 }}
          >
            <motion.div
              transition={{ duration: 0.7 }}
              animate={{ rotateY: flip ? 0 : 180 }}
              className="Card bg-sky-600  w-full h-full flex-1 flex flex-col justify-center items-center rounded-2xl"
            >
              <motion.div
                transition={{ duration: 0.7 }}
                animate={{ rotateY: flip ? 0 : 180 }}
                className="front absolute text-white text-4xl"
              >
                {props.originalWord}
              </motion.div>
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: flip ? 180 : 0 }}
                // style={{ display: flip ? "none" : "block" }}
                transition={{ duration: 0.7 }}
                className="back absolute text-white text-4xl"
              >
                {props.translatedWord}
              </motion.div>
            </motion.div>
          </motion.div>
        </TinderCard>
      </div>
      <div className="flex justify-center items-center">
        <Button
          className="flex"
          onClick={() => setFlip((prevState) => !prevState)}
        >
          Flip
        </Button>
        <ButtonRefresh></ButtonRefresh>
      </div>
    </>
  );
};
