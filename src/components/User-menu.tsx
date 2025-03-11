'use client';

import Link from 'next/link';
import { useMenu } from '@context/MenuContext';

interface UserMenuProps {
  mode: string;
  email: string | null;
  logout: () => void;
}

export default function UserMenu({ mode, email, logout }: UserMenuProps) {
  const { setIsMenuOpen } = useMenu();

  return (
    <div className={`${mode === 'header' ? 'max-md:hidden' : 'md:hidden'}`}>
      {email ? (
        <div className="flex">
          <div className="flex mr-8">{email}</div>
          <form action="logout">
            <button
              formAction={logout}
              className="hover:text-pink transition duration-100 ease-in-out"
            >
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div>
          <span>
            <Link
              className="block"
              href="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
