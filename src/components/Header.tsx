import React from 'react';
import UserMenu from '@components/User-menu';
import { createClient } from '@utils/supabase/server';
import Menu from '@components/Menu';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Notification from './Notification';

export default async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email || null;

  const logout = async () => {
    'use server';
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/');
  };

  return (
    <header className="flex items-center justify-start mb-6 mt-4">
      <Menu>
        <UserMenu email={email} mode="mobile" logout={logout} />
      </Menu>
      <Link className="mr-4" href="/">
        LexiLoop
      </Link>
      <div className="ml-auto flex items-center">
        <Notification />
        <UserMenu email={email} mode="header" logout={logout} />
      </div>
    </header>
  );
}
