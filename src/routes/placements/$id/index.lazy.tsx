import { createLazyFileRoute } from '@tanstack/react-router';

import { BaseLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import { PlacementForm } from './-components';

const RouteComponent = () => {
  return (
    <BaseLayout className='grid h-screen place-items-center'>
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

export const Route = createLazyFileRoute('/placements/$id/')({
  component: RouteComponent
});
