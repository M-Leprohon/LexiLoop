import { Button, Input } from '@nextui-org/react';
import { CreateTranslation } from '../../../../actions/create-translation';
import { TranslatedWord } from '../../../../components/words/TranslatedWord';
import * as deepl from 'deepl-node';

interface WordShowProps {
  params: {
    slug: string;
  };
}

export default async function WordShow({ params }: WordShowProps) {
  const decodedWord = decodeURI(params.slug);
  const createTranslationAction = CreateTranslation.bind(null, decodedWord);

  const authKey = process.env.DEEPL_API_KEY; // Replace with your key
  let result: string = 'Problem with Deepl';
  if (authKey) {
    const translator = new deepl.Translator(authKey);

    const returnedResult = await translator.translateText(
      decodedWord,
      'fi',
      'en-GB'
    );
    result = returnedResult.text; // Bonjour, le monde !
  }
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-6xl">{decodedWord}</h1>
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <form className="flex" action={createTranslationAction}>
            <Input
              name="translation"
              label=""
              labelPlacement="outside"
              placeholder="Enter the translation"
              autoComplete="false"
            />
            <input name="slug" type="hidden" value={decodedWord} />
            <Button type="submit">Submit</Button>
          </form>
          q{' '}
          <div className="pt-10">
            Suggested translation from Deepl (Finnish only): {result}
          </div>
        </div>
      </div>
    </>
  );
}
