'use client';

import React from 'react';
import {
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import Link from 'next/link';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = ['random', 'notebook'];
  return (
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      <NavbarBrand>
        <Link href="/">LexiLoop</Link>
      </NavbarBrand>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? 'warning'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              href={item}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarContent>
  );
}
