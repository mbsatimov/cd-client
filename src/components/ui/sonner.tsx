import { useTheme } from 'next-themes';
import React from 'react';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      className='toaster group'
      theme={theme as ToasterProps['theme']}
      closeButton
      position='top-center'
      toastOptions={{
        classNames: {
          toast:
            'group toast border group-[.toaster]:bg-background group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton: 'border group-[.toast]:bg-background group-[.toast]:text-foreground',
          error: 'text-red-500',
          success: 'text-green-500',
          warning: 'text-yellow-500',
          info: 'text-blue-500'
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
