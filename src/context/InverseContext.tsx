'use client';

import { createContext, useContext, useState } from 'react';

type InverseContextType = {
  isInverse: boolean;
  setIsInverse: (inverse: boolean) => void;
};

const InverseContext = createContext<InverseContextType | undefined>(undefined);

export const InverseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isInverse, setIsInverse] = useState(false);

  return (
    <InverseContext.Provider value={{ isInverse, setIsInverse }}>
      {children}
    </InverseContext.Provider>
  );
};

export const useInverse = () => {
  const context = useContext(InverseContext);
  if (!context)
    throw new Error('useLoading must be used within a LoadingProvider');
  return context;
};
