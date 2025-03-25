import { createLazyFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import { TransactionsTable } from './-components';

const TransactionsPage = () => {
  return (
    <div className='space-y-6'>
      <Helmet>
        <title>Transactions | MOCK - IELTS ZONE</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <h1 className='text-3xl font-bold'>Transactions</h1>
      <TransactionsTable />
    </div>
  );
};

export const Route = createLazyFileRoute('/_authenticated/transactions/')({
  component: TransactionsPage
});
