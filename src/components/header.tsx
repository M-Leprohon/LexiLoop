import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import SignOut from '@components/sign-out';
import { createClient } from '@utils/supabase/server';

export default async function Header() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">Vocabook</Link>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href="/notebook">Notebook</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/random">Random</Link>
        </NavbarItem>

        {email ? (
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <NavbarItem>{email}</NavbarItem>
            <NavbarItem>
              <SignOut />
            </NavbarItem>
          </div>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">Register</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
