import * as deepl from 'deepl-node';

interface Props {
  word: string;
}

export async function TranslatedWord(props: Props) {
  const authKey = process.env.DEEPL_API_KEY;
  if (authKey) {
    const translator = new deepl.Translator(authKey);

    let result: any;
    result = await translator.translateText(props.word, null, 'fr');
    result = result.text; // Bonjour, le monde !
    console.log(result);

    return <div>Le word: {result}</div>;
  } else {
    return <div>Problem with Deepl</div>;
  }
}
