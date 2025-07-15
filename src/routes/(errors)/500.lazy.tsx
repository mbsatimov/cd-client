import { createLazyFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  error: any;
}

export const GeneralError = ({ error, className }: GeneralErrorProps) => {
  const navigate = useNavigate();
  const { history } = useRouter();
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {error?.status && <h1 className='text-[7rem] font-bold leading-tight'>{error.status}</h1>}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          {error?.response?.data?.message ?? error.message}
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
};
export const Route = createLazyFileRoute('/(errors)/500')({
  component: GeneralError
});
