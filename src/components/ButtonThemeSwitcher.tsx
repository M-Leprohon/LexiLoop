// components/button/ThemeSwitcher.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { Switch } from '@nextui-org/react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <div>
      <Switch
        checked={theme === 'dark'}
        onChange={handleSetTheme}
        size="lg"
        color="secondary"
        startContent={<BsMoon className="w-5 h-5" />}
        endContent={<BsSun className="w-5 h-5" />}
      />
    </div>
  );
}
