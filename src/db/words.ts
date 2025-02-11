import { createClient } from '../utils/supabase/server';
import { Word } from '../types';

export async function fetchAllWords() {
  const supabase = createClient();
  const { data: words } = await supabase.from('word').select();
  return words;
}

export async function fetchWordBySlug(slug: string): Promise<Word | null> {
  const supabase = createClient();
  const { data: word } = await supabase
    .from('word')
    .select()
    .eq('original_word', slug);
  if (word) {
    return word[0];
  } else {
    return null;
  }
}

/*
export async function fetchWordByCategory(category: number): Promise<Word[] | null> {
  const session = await getServerSession(authOptions);

  const words = db.word.findMany({
      where: {
        categoryId: category,
        userId: session?.user?.id
      }
  })
  return words;
}
  */
