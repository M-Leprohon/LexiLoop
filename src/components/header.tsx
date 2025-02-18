import { Navbar } from '@nextui-org/react';
import React from 'react';
import UserMenu from '@components/user-menu';
import { createClient } from '@utils/supabase/server';
import Menu from '@components/menu';
import { redirect } from 'next/navigation';

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
    <header className="flex">
      <Navbar>
        <Menu>
          <UserMenu email={email} mode="mobile" logout={logout} />
        </Menu>
      </Navbar>
      <UserMenu email={email} mode="header" logout={logout} />
    </header>
  );
}
