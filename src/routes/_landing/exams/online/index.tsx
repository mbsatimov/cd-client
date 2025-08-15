import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import { getCDOnlineAll } from '@/utils/api/requests';

import { CDOnlineList } from './-components/CDOnlineList.tsx';
import { CoinPricesDialog } from './-components/CoinPricesDialog.tsx';

const RouteComponent = () => {
  const { user } = useAuth();
  const [openPricesDialog, setOpenPricesDialog] = React.useState(false);
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
      <div className='my-4 flex items-start justify-between md:my-6'>
        <h1 className='flex items-center gap-2 text-xl font-bold sm:text-2xl md:text-3xl'>
          CD Online Exams
          <Popover>
            <PopoverTrigger>
              <QuestionMarkCircledIcon className='size-5 text-primary md:size-6' strokeWidth={3} />
            </PopoverTrigger>
            <PopoverContent>
              Press ZONE COIN to convert the money on your balance into coins. You can then use
              these coins to purchase any section or the full version of the CD mock test online.
            </PopoverContent>
          </Popover>
        </h1>
        <div className='flex items-center gap-2'>
          <button
            className='flex items-center gap-2 text-nowrap'
            type='button'
            onClick={() => setOpenPricesDialog(true)}
          >
            <img alt='coin' className='size-6 sm:size-8' height={32} src='/coin.png' width={32} />
            <span className='text-lg sm:text-xl'>
              {user?.coins === 1 ? '1 Coin' : `${user?.coins} Coins`}
            </span>
          </button>
        </div>
        <CoinPricesDialog onOpenChange={setOpenPricesDialog} open={openPricesDialog} />
      </div>
      <p className='mb-4 max-w-4xl text-sm text-muted-foreground md:mb-6 md:text-base'>
        All test materials are 100% authentic, ensuring the same high standards as the in-person
        IELTS exam. Candidate submissions are assessed with exceptional reliability, combining
        expert evaluation and secure technology to guarantee accuracy. The results processing is
        fully automated, enabling online test takers to instantly view their scores along with a
        detailed breakdown of their performance and personalised feedback to help them improve.
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
