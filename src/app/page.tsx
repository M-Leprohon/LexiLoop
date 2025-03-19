'use client';

import { Input, Button } from '@nextui-org/react';
import { createTerm, CreateWordFormState } from 'actions/create-term';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '../context/LoadingContext';

export default function Home() {
  const [messages, setMessages] = useState<CreateWordFormState | null>(null);
  const { isLoading, setLoading } = useLoading();

  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    console.log('loading status:', isLoading);
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Call server action manually
    const res = await createTerm(formData);
    setMessages(res);
    if (res.success) router.push(`/word/${res.encodedWord}/translate`);
    if (res.errors._form && res.errors._form?.length > 0) setLoading(false);
  };

  return (
    <>
      <h1 className="flex justify-center mt-8">Add a new card</h1>
      <div className="flex justify-center mt-8">
        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <form className="flex" onSubmit={handleSubmit}>
            <input
              type="text"
              name="word"
              placeholder="Enter a word to translate"
              autoComplete="false"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-[16px]"
            />
            {messages?.errors.original_word?.map((error, i) => {
              return (
                <li
                  className="text-cadmium-red"
                  key={`customer-service-error-${i}`}
                >
                  {error}
                </li>
              );
            })}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
          {messages?.errors._form ? (
            <div className="text-red-500 text-xs pt-1 pl-1">
              {messages.errors._form?.join(', ')}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
