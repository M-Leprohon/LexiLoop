'use server';
import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';

export async function CreateTranslation(slug: string, formData: FormData) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const translation = formData.get('translation');

  const spaceLessWordCapitalized = translation
    ? translation.toString().charAt(0).toUpperCase() +
      translation.toString().slice(1).trimEnd()
    : '';

  const { error } = await supabase
    .from('word')
    .update({ translated_word: spaceLessWordCapitalized })
    .eq('original_word', slug)
    .eq('userid', data.user?.id);

  const encodedSlug = encodeURI(slug);
  redirect(`/word/${encodedSlug}`);
}
