'use client';
import React from 'react';
import Link from 'next/link';
import { useMenu } from '@context/MenuContext';

interface MenuProps {
  children: React.ReactNode;
}

export default function Menu(props: MenuProps) {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const menuItems = ['random', 'notebook'];

  return (
    <div className="relative">
      <button
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="h-6 w-6 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <nav className="absolute -left-full h-screen w-screen bg-white rounded-md shadow-lg py-1 z-20 p-12">
          {menuItems.map((item) => (
            <Link
              className="block mb-2"
              key={item}
              href={`/${item}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          {props.children}
        </nav>
      )}
    </div>
  );
}
