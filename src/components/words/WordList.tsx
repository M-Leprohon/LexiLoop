import type { Word } from '@prisma/client'
import Link from 'next/link';

export const WordList = (props: any) => {

  const renderable = props.words?.map((word: any, i: number) => {
    const url = `/word/${word.original_word}`
    return <div className="block" key={i}>
      <div className="inline-block w-2/5">
        <Link className="underline decoration-solid" href={url}>{ word.original_word }</Link>
      </div>
      <div className="inline-block w-2/5">
        <Link className="underline decoration-solid" href={url}>{ word.translated_word }</Link>
      </div>
      <div className="inline-block w-1/5">
        <Link className="underline decoration-solid" href={url}>{ word.familiarity }</Link>
      </div>
      </div>
  });

  return (
    <div className="">{renderable}</div>
  );
}