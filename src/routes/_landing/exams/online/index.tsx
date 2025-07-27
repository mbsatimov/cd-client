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
      <h1 className='mb-6 mt-6 text-3xl font-bold'>
        CD Online Exams <span className='text-yellow-500'>(Beta)</span>
      </h1>
      <p className='mb-6 max-w-4xl text-muted-foreground'>
        Enjoy the flexibility of taking your IELTS CD exam online from anywhere. With a lower cost
        and convenient access, this option allows you to take the exam at your own pace, without the
        need for travel. Perfect for those seeking a more affordable and accessible test experience.
      </p>
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
