import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui';
import { useTheme } from '@/utils/context/theme-context.tsx';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff';
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor);
  }, [theme]);

  return (
    <Button
      className='scale-95 rounded-full'
      size='icon'
      variant='ghost'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <MoonIcon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};
