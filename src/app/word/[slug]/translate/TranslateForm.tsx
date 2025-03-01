'use client';
import { Button, Input } from '@nextui-org/react';
import { CreateTranslation } from '../../../../actions/create-translation';
import { useLoading } from '@context/LoadingContext';
import { useEffect } from 'react';

export default function TranslateForm(props: { word: string }) {
  const decodedWord = decodeURI(props.word);
  const createTranslationAction = CreateTranslation.bind(null, decodedWord);
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <form className="flex" action={createTranslationAction}>
      <input
        type="text"
        name="translation"
        placeholder="Enter the translation"
        autoComplete="false"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-[16px]"
      />
      <input
        name="slug"
        type="hidden"
        value={decodedWord}
        disabled={isLoading}
      />
      <Button onClick={() => setLoading(true)} type="submit">
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
