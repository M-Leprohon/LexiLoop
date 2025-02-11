import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';

export default function SignOut() {
  const logout = async () => {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
  };

  return (
    <form>
      <button
        formAction={logout}
        className="text-black hover:text-pink transition duration-100 ease-in-out"
      >
        Logout
      </button>
    </form>
  );
}
