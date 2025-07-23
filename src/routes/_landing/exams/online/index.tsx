import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import { BaseLayout } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb.tsx';
import { getCDOnlineAll } from '@/utils/api/requests';

import { CDOnlineList } from './-components/CDOnlineList.tsx';

const RouteComponent = () => {
  return (
    <BaseLayout>
      <Helmet>
        <title>CD Online | MOCK - IELTS ZONE</title>
      </Helmet>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>CD Online</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='mb-6 mt-6 text-3xl font-bold'>CD Online Exams</h1>
      <CDOnlineList />
    </BaseLayout>
  );
};

export const Route = createFileRoute('/_landing/exams/online/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.prefetchQuery({
      queryKey: ['cd-online', 'all'],
      queryFn: () => getCDOnlineAll()
    })
});
