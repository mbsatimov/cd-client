import { createLazyFileRoute } from '@tanstack/react-router';

import { BaseLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import { PlacementForm } from './-components';

const RouteComponent = () => {
  return (
    <BaseLayout className='flex h-screen flex-col items-center justify-center gap-4'>
      <div className='mb-4 flex items-center justify-center'>
        <img alt='IELTS ZONE' className='h-16 dark:hidden' src='/logo.png' />
        <img alt='IELTS ZONE' className='hidden h-16 dark:inline' src='/logo-dark.png' />
      </div>
      <Card className='w-full max-w-sm'>
        <CardHeader className='flex flex-col space-y-2 text-left'>
          <CardTitle>Start Placement</CardTitle>
          <CardDescription>Enter your details to participate in the test</CardDescription>
        </CardHeader>
        <CardContent>
          <PlacementForm />
        </CardContent>
      </Card>
    </BaseLayout>
  );
};

export const Route = createLazyFileRoute('/placement/')({
  component: RouteComponent
});
