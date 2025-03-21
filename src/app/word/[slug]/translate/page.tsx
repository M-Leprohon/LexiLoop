import { CreateTranslation } from '../../../../actions/create-translation';
import * as deepl from 'deepl-node';
import TranslateForm from './TranslateForm';

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
        <h1 className="text-5xl break-words text-center max-w-full overflow-hidden">
          {decodedWord}
        </h1>
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <TranslateForm word={decodedWord} />
          <div className="pt-10">
            Suggested translation from Deepl (Finnish only): {result}
          </div>
        </div>
      </div>
    </>
  );
}
