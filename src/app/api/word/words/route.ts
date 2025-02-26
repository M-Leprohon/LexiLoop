import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '../../../../utils/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { data: words } = await supabase.from('word').select();
  console.log('we got this data from server', words);
  return Response.json({ words });
}
