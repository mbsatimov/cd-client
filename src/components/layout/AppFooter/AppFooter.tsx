import { Link } from '@tanstack/react-router';
import { CommandIcon } from 'lucide-react';
import React from 'react';

import { Separator } from '@/components/ui';
import { cn } from '@/lib/utils.ts';

interface Props extends React.ComponentProps<'footer'> {}

export const AppFooter = React.forwardRef<React.ElementRef<'footer'>, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer ref={ref} className={cn('', className)} {...props}>
        <div className='mx-auto max-w-6xl px-4 py-10'>
          <div className='flex flex-col items-start justify-between gap-8 md:gap-12 lg:flex-row'>
            <div>
              <Link className='flex items-center gap-2' to='/'>
                <CommandIcon />
                <span className='text-2xl font-medium'>IELTS ZONE</span>
              </Link>
              <p className='mt-6 text-lg font-medium text-muted-foreground'>
                The best platform for learning.
              </p>
            </div>
          </div>

          <Separator className='my-6 md:my-10' />

          <div className='flex flex-col justify-between gap-6 lg:flex-row'>
            <p>© 2025 Platform «CDE»</p>
          </div>
        </div>
      </footer>
    );
  }
);
AppFooter.displayName = 'AppFooter';
