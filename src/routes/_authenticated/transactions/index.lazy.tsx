import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { FillBalanceDialog } from '@/components/FillBalanceDialog.tsx';
import { Button } from '@/components/ui';

import { TransactionsTable } from './-components';

const TransactionsPage = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  return (
    <div className='space-y-6'>
      <Helmet>
        <title>Transactions | MOCK - IELTS ZONE</title>
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <h1 className='text-3xl font-bold'>Transactions</h1>
      <div>
        <Button onClick={() => setOpenDialog(true)}>Fill balance</Button>
        <FillBalanceDialog onOpenChange={setOpenDialog} open={openDialog} />
      </div>
      <TransactionsTable />
    </div>
  );
};

export const Route = createLazyFileRoute('/_authenticated/transactions/')({
  component: TransactionsPage
});
