import { createClient } from '@utils/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user?.id;
}
