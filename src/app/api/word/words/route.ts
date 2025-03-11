import { createClient } from '../../../../utils/supabase/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  const isSentenceMode = searchParams.get('sentence_mode');

  let words;
  if (isSentenceMode === 'true') {
    const { data } = await supabase
      .from('word')
      .select('*')
      .like('original_word', '% %');
    words = data;
  } else {
    const { data } = await supabase
      .from('word')
      .select('*')
      .not('original_word', 'like', '% %');
    words = data;
  }
  return Response.json({ words });
}
