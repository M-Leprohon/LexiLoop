'use server';

import { createClient } from '../utils/supabase/server';

export default async function Notification() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="ml-10">
      {user?.is_anonymous
        ? 'You are not logged in, all progress will be lost.'
        : null}
    </div>
  );
}
