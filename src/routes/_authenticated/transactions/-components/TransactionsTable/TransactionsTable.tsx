import { format } from 'date-fns';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from 'lucide-react';

import {
  Badge,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils.ts';
import { transactionForMap, transactionSourceMap } from '@/utils/constants/transaction.ts';

import { useTransactionList } from './hooks';

export const TransactionsTable = () => {
  const { state } = useTransactionList();

  if (state.isLoading) {
    return (
      <div className='mt-10 grid place-items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Table>
        <TableHeader>
          <TableRow className='font-medium'>
            <TableHead>#</TableHead>
            <TableHead>DATE INITIATED</TableHead>
            <TableHead>SOURCE</TableHead>
            <TableHead>PAID FOR</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='font-medium text-muted-foreground'>
          {state.transactions?.length ? (
            state.transactions?.map((row, index) => (
              <TableRow key={index} className={cn('relative', row.isCanceled && 'opacity-50')}>
                <TableCell>
                  {row.isCanceled && (
                    <div className='absolute inset-x-2 inset-y-0 flex items-center'>
                      <div className='h-[1px] w-full bg-black/30'></div>
                      <Badge
                        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                        variant='destructive'
                      >
                        Canceled
                      </Badge>
                    </div>
                  )}
                  {index + 1}
                </TableCell>
                <TableCell>{format(row.createdAt, 'dd MMM, yyyy HH:mm')}</TableCell>
                <TableCell>
                  {row.fundingSource ? (
                    <Badge variant='outline'>{transactionSourceMap[row.fundingSource]}</Badge>
                  ) : (
                    <span className='ml-2'>-</span>
                  )}
                </TableCell>
                <TableCell>{row.paidFor ? transactionForMap[row.paidFor] : '-'}</TableCell>
                <TableCell>
                  {row.isExpense ? (
                    <div className='flex items-center gap-1'>
                      <ArrowDownIcon className='size-4' />
                      Exam Fee
                    </div>
                  ) : (
                    <div className='flex items-center gap-1'>
                      <ArrowUpIcon className='size-4' />
                      Deposit
                    </div>
                  )}
                </TableCell>
                <TableCell className='flex items-center gap-2'>
                  <Badge
                    className={cn(
                      'shadow-none',
                      row.isExpense
                        ? 'bg-red-500/10 text-red-700'
                        : 'bg-emerald-500/10 text-emerald-700'
                    )}
                  >
                    {row.isExpense ? '-' : '+'}
                    {row.paidFor === 'CD_ONLINE' || row.paidFor === 'COIN_SHARE' ? (
                      <span className='flex items-center gap-1'>
                        {row.amount}
                        <img alt='coin' className='inline-block size-4' src='/coin.png' />
                      </span>
                    ) : (
                      formatPrice(row.amount)
                    )}
                  </Badge>
                  {row.paidFor === 'COIN_EXCHANGE' && (
                    <>
                      <ArrowRightIcon className='size-4' />
                      <Badge className={cn('gap-1 bg-emerald-500/10 text-emerald-700 shadow-none')}>
                        +{row.numberOfPurchasedCoins}
                        <img alt='coin' className='inline-block size-3' src='/coin.png' />
                      </Badge>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='h-24 text-center' colSpan={6}>
                No transactions.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
