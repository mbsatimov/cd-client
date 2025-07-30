import { useSuspenseQuery } from '@tanstack/react-query';
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
import { getCDOnlineAll, getMe } from '@/utils/api/requests';

import { CDOnlineList } from './-components/CDOnlineList.tsx';
import { CoinPricesDialog } from './-components/CoinPricesDialog.tsx';

const RouteComponent = () => {
  const getMeQuery = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: () => getMe()
  });
  const user = getMeQuery.data.data;
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
        <h1 className='text-xl font-bold sm:text-2xl md:text-3xl'>
          CD Online Exams <span className='text-yellow-500'>(Beta)</span>
        </h1>
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
        <CoinPricesDialog onOpenChange={setOpenPricesDialog} open={openPricesDialog} />
      </div>
      <p className='mb-4 max-w-4xl text-sm text-muted-foreground md:mb-6 md:text-base'>
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
