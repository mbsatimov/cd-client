import { createFileRoute } from '@tanstack/react-router';

import { BaseLayout } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb.tsx';

import { TestsTable } from './-components';

const RouteComponent = () => {
  return (
    <BaseLayout className='space-y-6'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Placements</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='text-3xl font-bold'>Placements</h1>
      <TestsTable />
    </BaseLayout>
  );
};

export const Route = createFileRoute('/placements/')({
  component: RouteComponent
});
