import { Link, useRouter } from '@tanstack/react-router';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import React from 'react';

import { Button } from '@/components/ui';
import { useAuth } from '@/utils/stores';

import { BalanceDropdown, NavUser, ThemeSwitch } from './components';

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
        className='mx-auto flex h-full w-full max-w-6xl grid-cols-2 items-center justify-between rounded-full bg-background/70 px-4 backdrop-blur-md'
        transition={{ duration: 0.75 }}
      >
        <Link className='flex items-center justify-start gap-1' to='/'>
          <img alt='IELTS ZONE' className='h-6 dark:hidden sm:h-8' src='/logo.png' />
          <img alt='IELTS ZONE' className='hidden h-6 dark:inline sm:h-8' src='/logo-dark.png' />
        </Link>
        <div className='flex items-center justify-end sm:gap-2'>
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
