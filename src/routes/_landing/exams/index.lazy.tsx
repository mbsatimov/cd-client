import { createLazyFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import { BaseLayout } from '@/components/layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import { ExamList, Toolbar } from './-components';

const ExamsPage = () => {
  return (
    <BaseLayout>
      <Helmet>
        <title>Exams | MOCK - IELTS ZONE</title>
      </Helmet>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Exams</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='mb-6 mt-6 text-3xl font-bold'>Available Exams</h1>
      <Toolbar />
      <ExamList />
    </BaseLayout>
  );
};

export const Route = createLazyFileRoute('/_landing/exams/')({
  component: ExamsPage
});
