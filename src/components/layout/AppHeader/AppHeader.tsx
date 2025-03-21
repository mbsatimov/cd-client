import { Link, useRouter } from '@tanstack/react-router';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { CommandIcon } from 'lucide-react';
import React from 'react';

import { BalanceDropdown } from '@/components/layout/AppHeader/components/BalanceDropdown.tsx';
import { Button } from '@/components/ui';
import { useAuth } from '@/utils/stores';

import { NavUser } from './components/NavUser.tsx';
import { ThemeSwitch } from './components/ThemeSwitch.tsx';

export const AppHeader = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 100);
  });

  return (
    <motion.header
      animate={{
        top: scrolled ? '16px' : '0px',
        y: 0
      }}
      className='sticky inset-0 z-50 h-14 gap-3'
      initial={{ y: '-100%' }}
      transition={{ duration: 0.75 }}
    >
      <motion.div
        animate={{
          maxWidth: scrolled ? '800px' : '1152px',
          width: scrolled ? '90%' : '100%',
          boxShadow: scrolled
            ? 'rgba(34, 42, 53, 0.06) 0px 0px 24px, rgba(0, 0, 0, 0.05) 0px 1px 1px, rgba(34, 42, 53, 0.04) 0px 0px 0px 1px, rgba(34, 42, 53, 0.08) 0px 0px 4px, rgba(47, 48, 55, 0.05) 0px 16px 68px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset'
            : 'none'
        }}
        className='mx-auto grid h-full w-full max-w-6xl grid-cols-2 items-center rounded-full bg-background/70 px-4 backdrop-blur-md md:grid-cols-[1fr,auto,1fr]'
        transition={{ duration: 0.75 }}
      >
        <Link className='flex items-center justify-start gap-1' to='/'>
          <CommandIcon className='size-5' />
          <span className='text-lg font-medium leading-none'>IELTS ZONE</span>
        </Link>
        <div className='hidden justify-center gap-3 px-6 text-sm md:flex'>
          <Link
            className='px-2 font-medium text-muted-foreground transition-colors hover:text-foreground'
            activeProps={{ className: 'text-primary' }}
            to='/exams'
          >
            Exams
          </Link>
          <Link
            className='px-2 font-medium text-muted-foreground transition-colors hover:text-foreground'
            activeProps={{ className: 'text-primary' }}
            to='/features'
          >
            Features
          </Link>
        </div>
        <div className='flex items-center justify-end gap-2'>
          {user && <BalanceDropdown />}
          <ThemeSwitch />
          {user ? (
            <NavUser />
          ) : (
            <>
              <Button variant='ghost' onClick={() => router.navigate({ to: '/login' })}>
                Login
              </Button>
              <Button onClick={() => router.navigate({ to: '/register' })}>Sign Up</Button>
            </>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
};
