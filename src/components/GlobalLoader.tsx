'use client';
import { useLoading } from '../context/LoadingContext';

const GlobalLoader = () => {
  const { isLoading } = useLoading();
  console.log('loading status:', isLoading);
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoader;
