import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

import { Spinner } from '@/components/ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb.tsx';

import { CDOnlineList } from './-components/CDOnlineList.tsx';

const RouteComponent = () => {
  return (
    <div className='space-y-6'>
      <Helmet>
        <title>My Online Exams | MOCK - IELTS ZONE</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/exams/online'>CD Online Exams</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Online Exams</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='text-3xl font-bold'>Online Exams</h1>
      <Suspense
        fallback={
          <div className='grid place-items-center py-10'>
            <Spinner className='size-10' />
          </div>
        }
      >
        <CDOnlineList />
      </Suspense>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/online/')({
  component: RouteComponent
});
