import React from 'react';

import { cn } from '@/lib/utils';

interface MainProps extends React.ComponentProps<'div'> {
  fixed?: boolean;
}

export const BaseLayout = React.forwardRef<React.ElementRef<'div'>, MainProps>(
  ({ fixed, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full max-w-6xl px-2 py-4 md:px-4 md:py-6',
          fixed && 'flex flex-grow flex-col overflow-hidden',
          className
        )}
        {...props}
      />
    );
  }
);
BaseLayout.displayName = 'BaseLayout';
