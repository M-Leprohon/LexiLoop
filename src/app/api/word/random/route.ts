import { createClient } from '@utils/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();

  const { data: word } = await supabase.from('random_word').select().limit(1);

  return Response.json({ word });
}
