import { NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';

interface UserMenuProps {
  mode: string;
  email: string | null;
  logout: () => void;
}

export default function UserMenu({ mode, email, logout }: UserMenuProps) {
  return (
    <div
      className={`ml-auto ${mode === 'header' ? 'max-md:hidden' : 'md:hidden'}`}
    >
      {email ? (
        <div className="flex">
          <div className="flex mr-8">{email}</div>
          <form action="logout">
            <button
              formAction={logout}
              className="text-black hover:text-pink transition duration-100 ease-in-out"
            >
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div>
          <span>
            <Link href="/login">Login</Link>
          </span>
          <span>
            <Link href="/register">Register</Link>
          </span>
        </div>
      )}
    </div>
  );
}
