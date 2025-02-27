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
      <Input
        name="translation"
        label=""
        labelPlacement="outside"
        placeholder="Enter the translation"
        autoComplete="false"
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
