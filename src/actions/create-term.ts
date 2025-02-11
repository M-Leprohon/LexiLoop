'use server';

import { z } from 'zod';
import { createClient } from '@utils/supabase/server';

const createTopicSchema = z.object({
  original_word: z.string().min(1),
});

export interface CreateWordFormState {
  errors: {
    original_word?: string[];
    _form?: string[];
  };
  encodedWord?: string;
  success?: boolean;
  resetKey?: string;
}

interface supabaseError {
  error: {
    code: string;
    details?: string;
    hint?: string;
    message: string;
  };
  data?: any;
  count?: number;
  status: number;
  statusText: string;
}

export async function createTerm(
  formData: FormData
): Promise<CreateWordFormState> {
  const supabase = createClient();

  const result = createTopicSchema.safeParse({
    original_word: formData.get('word'),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { data, error } = await supabase.auth.getUser();
  console.log(data.user?.id);

  const encodedWord = encodeURI(result.data.original_word);

  try {
    console.log('we are trying');
    const error = await supabase.from('word').insert({
      original_word: result.data.original_word,
      translated_word: 'notTranslated',
      familiarity: 0,
      userid: data.user?.id,
    });
    console.log(error);
    if (error && error.error && error.error.code) {
      console.log('error code is not undefined');
      switch (error.error.code) {
        case '23505':
          error.error.message = 'This word already exists in the database';
      }
      return {
        errors: {
          _form: [error.error.message],
        },
        success: false,
      };
    }
  } catch (error: any) {
    return {
      errors: {
        _form: ['Something went wrong'],
      },
      success: false,
    };
  }
  return {
    errors: {},
    success: true,
    encodedWord: encodedWord,
    resetKey: Date.now().toString(),
  };
}
