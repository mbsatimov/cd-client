import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import { CDOnlineList } from './-components/CDOnlineList.tsx';

const RouteComponent = () => {
  return (
    <div className='space-y-6'>
      <Helmet>
        <title>My Online Exams | MOCK - IELTS ZONE</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <h1 className='text-3xl font-bold'>Online Exams</h1>
      <CDOnlineList />
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/online/')({
  component: RouteComponent
});
